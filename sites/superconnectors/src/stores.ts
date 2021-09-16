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
	const init = (asks: Ask[]) => {
		initialAsks = asks;
		const mappedAsks = asks.map((ask: Ask) => {
			return { ...ask, superconnectors: [] };
		});
		set(mappedAsks);
	};

	const fake = (superconnectors: Contestant[]) => {
		update((asks) =>
			asks.map((ask: Ask) => {
				const scs = getRandomSubarray(superconnectors);
				return { ...ask, superconnectors: scs, resolved: false };
			})
		);
	};

	const resolveAsks = (args: { index: number }) => {
		console.log(args);
		return update((asks) =>
			asks.map((ask, i) => {
				return args.index === i ? { ...ask, resolved: true } : ask;
			})
		);
	};

	return {
		subscribe,
		resolveAsks,
		init,
		fake,
		update,
		reset: () => init(initialAsks)
	};
};

export const gStore = _gStore();

export const leaderStore = derived(gStore, (gameData) => {
	const tempData = gameData.reduce((acc: any, { superconnectors, points, resolved }) => {
		if (resolved) {
			for (const { first_name, contestant_id } of superconnectors) {
				const oldScore = acc[first_name] ? acc[first_name].score : 0;
				acc[first_name] = {
					first_name,
					contestant_id,
					score: oldScore + Math.floor(points / superconnectors.length)
				};
			}
		}
		return acc;
	}, {});
	return Object.values(tempData).sort((a: any, b: any) => b.score - a.score);
});
