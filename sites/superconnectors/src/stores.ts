import { writable, derived } from 'svelte/store';
import type { Ask, Contestant } from '$types/models';

export const getRandomSubarray: (arr: any[]) => any[] = (arr) => {
	const shuffled = arr.slice(0);
	let i = arr.length;
	let temp: any;
	let index: number;
	const size = Math.ceil(Math.random() * arr.length);
	while (i--) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(0, size);
};

export const asksStore = writable([]);

export const contestantsStore = writable([]);

export const _gStore = () => {
	const { subscribe, update, set } = writable([]);
	let initialAsks: Ask[];
	let initialSuperconnectors: Contestant[];
	const init = (asks: Ask[], superconnectors: Contestant[]) => {
		initialAsks = asks;
		initialSuperconnectors = superconnectors;
		const mappedAsks = asks.map((ask: Ask) => {
			return { ...ask, superconnectors: [] };
		});
		set(mappedAsks);
	};

	const resolveAsks = (args: { index: number }) => {
		return update((asks) =>
			asks.map((ask, i) => {
				return args.index === i ? { ...ask, resolved: true } : ask;
			})
		);
	};
	const addSuperconnector = (args: { index: number }) => {
		return update((asks) =>
			asks.map((ask, i) => {
				const scs = getRandomSubarray(initialSuperconnectors);
				return args.index === i ? { ...ask, superconnectors: scs } : ask;
			})
		);
	};

	return {
		subscribe,
		resolveAsks,
		addSuperconnector,
		init,
		update,
		reset: () => init(initialAsks, initialSuperconnectors)
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
