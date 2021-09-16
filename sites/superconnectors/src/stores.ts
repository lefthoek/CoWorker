import { writable, derived } from 'svelte/store';

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

export const gameStore = derived([asksStore, contestantsStore], ([askData, superconnectors]) => {
	return askData.map((ask) => {
		const scs = getRandomSubarray(superconnectors);
		return { ...ask, superconnectors: scs };
	});
});

export const leaderStore = derived(gameStore, (gameData) => {
	const tempData = gameData.reduce((acc: any, { superconnectors, points }) => {
		for (const { first_name, contestant_id } of superconnectors) {
			const oldScore = acc[first_name] ? acc[first_name].score : 0;
			acc[first_name] = { first_name, contestant_id, score: oldScore + points };
		}
		return acc;
	}, {});
	return Object.values(tempData).sort((a: any, b: any) => b.score - a.score);
});
