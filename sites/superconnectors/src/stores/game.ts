import { writable } from 'svelte/store';
import type { Ask, Contestant } from '$types/models';

export const _gameStore = () => {
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

const gameStore = _gameStore();

export default gameStore;
