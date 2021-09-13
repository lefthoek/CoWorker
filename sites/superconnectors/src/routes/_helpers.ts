import type { Contestant, Ask } from '$types/models';

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

export const createLeaderData: (
	gameData: (Ask & { superconnectors: Contestant[] })[]
) => Contestant[] = (gameData) => {
	const tempData: Record<string, Contestant> = gameData.reduce(
		(acc, { superconnectors, points }) => {
			for (const { first_name, contestant_id } of superconnectors) {
				const oldScore = acc[first_name] ? acc[first_name].score : 0;
				acc[first_name] = { first_name, contestant_id, score: oldScore + points };
			}
			return acc;
		},
		{}
	);
	return Object.values(tempData).sort((a, b) => b.score - a.score);
};

export const createGameData: (
	askData: Ask[],
	superconnectors: Contestant[]
) => (Ask & { superconnectors: Contestant[] })[] = (askData, superconnectors) => {
	return askData.map((ask) => {
		const scs = getRandomSubarray(superconnectors);
		return { ...ask, superconnectors: scs };
	});
};
