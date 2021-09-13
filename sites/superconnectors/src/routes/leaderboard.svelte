<script context="module" lang="ts">
	import { createGameData } from './_helpers';

	export const load = async () => {
		const askData: Ask[] = [
			{ team: 'Meholi', summary: 'Cofounder with Experience', points: 33 },
			{ team: 'X-Stream', summary: 'Impact Investor', points: 17 },
			{ team: 'Holy Waters', summary: 'customers in UK', points: 3 },
			{ team: 'Toys Are U', summary: 'bank with balls', points: 58 }
		];

		const superconnectors: Contestant[] = [
			{ first_name: 'Constantijn' },
			{ first_name: 'Ohad' },
			{ first_name: 'Lars' },
			{ first_name: 'Lisette' },
			{ first_name: 'Maurice' }
		].map((s, i) => {
			return { ...s, contestant_id: i + 1, score: 0 };
		});

		const gameData = createGameData(askData, superconnectors);

		return { props: { gameData } };
	};
</script>

<script lang="ts">
	import type { Contestant, Ask } from '$types/models';
	import LeaderBoard from '$components/LeaderBoard.svelte';
	import { createLeaderData } from './_helpers';
	export let gameData: (Ask & { superconnectors: Contestant[] })[];
	$: leaderData = createLeaderData(gameData);
</script>

<main class="md:p-8 md:pt-16 md:p-16 flex h-full flex-col justify-between">
	<div class="w-full h-full max-w-4xl mx-auto">
		<LeaderBoard {leaderData} />
		<!-- <ContestantForm on:addContestant={({ detail }) =>
      addContestant(detail)} /> -->
	</div>
</main>
