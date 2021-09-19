import { writable, derived } from 'svelte/store';
import type { Ask, Contestant } from '$types/models';

export const _gStore = () => {
	const { subscribe, update, set } = writable([]);
	let initialAsks: Ask[];

	const init = (asks: Ask[]) => {
		initialAsks = asks;
		const mappedAsks = asks.map((ask: Ask) => {
			return { ...ask, superconnectors: [], resolved: false };
		});
		set(mappedAsks);
	};

	const toggleResolve = ({ index }: { index: number }) =>
		update((asks) =>
			asks.map((ask, i) => {
				return index === i ? { ...ask, resolved: !ask.resolved } : ask;
			})
		);

	const addSuperconnector = ({
		index,
		superconnector
	}: {
		index: number;
		superconnector: Contestant;
	}) =>
		update((asks) =>
			asks.map(({ superconnectors, ...ask }, i) => {
				const scsSet = new Set(superconnectors);
				return index === i
					? { ...ask, superconnectors: Array.from(scsSet.add(superconnector)) }
					: { ...ask, superconnectors };
			})
		);

	const removeSuperconnector = ({ index, name }: { index: number; name: string }) =>
		update((asks) =>
			asks.map(({ superconnectors, ...ask }: Ask, i: number) => {
				console.log(index, name);
				const scs =
					index === i
						? superconnectors.filter(({ first_name }) => {
								return name !== first_name;
						  })
						: superconnectors;
				return { ...ask, superconnectors: scs };
			})
		);

	const changePoints = ({
		index,
		action,
		points: np
	}: {
		index: number;
		action: 'increase' | 'reduce' | 'set';
		points?: number;
	}) => {
		update((asks) =>
			asks.map(({ points, ...ask }, i) => {
				const lookup = {
					increase: (p: number) => (p + 1 <= 99 ? p + 1 : 99),
					set: () => (np <= 1 ? 1 : np >= 99 ? 99 : np),
					reduce: (p: number) => (p - 1 >= 1 ? p - 1 : 1)
				};
				const newPoints = lookup[action](points);
				return index === i ? { ...ask, points: newPoints } : { ...ask, points };
			})
		);
	};

	return {
		subscribe,
		changePoints,
		toggleResolve,
		addSuperconnector,
		removeSuperconnector,
		init,
		update,
		reset: () => init(initialAsks)
	};
};

export const gStore = _gStore();

export const leaderStore = derived(gStore, (gameData) => {
	const tempData: Record<string, Contestant> = gameData.reduce(
		(acc, { superconnectors, points, resolved }) => {
			if (resolved) {
				for (const { first_name, contestant_id } of superconnectors) {
					const oldScore = acc[first_name] ? acc[first_name].score : 0;
					acc[first_name] = {
						first_name,
						contestant_id,
						score: oldScore + (Math.floor(points / superconnectors.length) || 1)
					};
				}
			}
			return acc;
		},
		{}
	);
	return Object.values(tempData).sort((a, b) => b.score - a.score);
});
