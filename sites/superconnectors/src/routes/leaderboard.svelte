<script context="module" lang="ts">
	import { createGameData } from './_helpers';
	import { asksStore, contestantsStore, leaderStore } from '../stores';

	export const load = async ({ fetch }) => {
		const asks_promise = fetch('/asks.json');
		const sc_promise = fetch('/superconnectors.json');
		const [asks_res, sc_res] = await Promise.all([asks_promise, sc_promise]);
		const [askData, superconnectors] = await Promise.all([asks_res.json(), sc_res.json()]);
		asksStore.set(askData);
		const contestants = superconnectors.map((s: Contestant, i: number) => {
			return { ...s, contestant_id: i + 1, score: 0 };
		});
		contestantsStore.set(contestants);
		const gameData = createGameData(askData, contestants);

		return { props: { gameData } };
	};
</script>

<script lang="ts">
	import type { Contestant } from '$types/models';
	import LeaderBoard from '$components/LeaderBoard.svelte';
</script>

<main class="md:p-8 md:pt-16 md:p-16 flex h-full flex-col justify-between">
	<div class="w-full h-full max-w-4xl mx-auto">
		<LeaderBoard leaderData={$leaderStore} />
	</div>
</main>
