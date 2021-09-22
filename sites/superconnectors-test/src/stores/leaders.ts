import { derived } from 'svelte/store';
import gameStore from './gameData';
import type { Contestant } from '$types/models';

const leaderStore = derived(gameStore, (gameData) => {
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

export default leaderStore;
