<script context="module" lang="ts">
	export const load = async () => {
		const askData: Ask[] = [
			{ team: 'Meholi', summary: 'Cofounder with Experience', points: 33 },
			{ team: 'X-Stream', summary: 'Impact Investor', points: 17 },
			{ team: 'Holy Waters', summary: 'customers in UK', points: 3 },
			{ team: 'Toys Are U', summary: 'bank with balls', points: 58 }
		];

		const superconnectors: SuperConnector[] = [
			{ first_name: 'Constantijn' },
			{ first_name: 'Ohad' },
			{ first_name: 'Lars' },
			{ first_name: 'Lisette' },
			{ first_name: 'Maurice' }
		];

		const leaderData: Contestant[] = superconnectors.map((contestant, index) => {
			return { ...contestant, contestant_id: index + 1, score: 0 };
		});
		return { props: { leaderData, askData } };
	};
</script>

<script lang="ts">
	import type { Contestant, SuperConnector, Ask } from '$types/models';
	import LeaderBoard from '$components/LeaderBoard.svelte';
	export let leaderData: Contestant[];
	export let askData: Ask[];

	$: sorted = leaderData.sort((a, b) => b.score - a.score);

	/*
	const addContestant = (contestant: any) => {
		if (contestant) {
			leaderData = [...leaderData, contestant];
		}
	};
  */
</script>

<main class="md:p-8 md:pt-16 md:p-16 flex h-full flex-col justify-between">
	<div class="w-full h-full max-w-4xl mx-auto">
		<LeaderBoard leaderData={sorted} />
		<!-- <ContestantForm on:addContestant={({ detail }) =>
      addContestant(detail)} /> -->
	</div>
</main>
