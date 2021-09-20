<script context="module" lang="ts">
	import gStore from '../stores/game';
	import leaderStore from '../stores/leaders';

	export const load = async ({ fetch }) => {
		const asks_promise = fetch('/asks.json');
		const sc_promise = fetch('/superconnectors.json');
		const [asks_res, sc_res] = await Promise.all([asks_promise, sc_promise]);
		const [askData, superconnectors]: [Ask[], Contestant[]] = await Promise.all([
			asks_res.json(),
			sc_res.json()
		]);

		gStore.init(askData);

		return { props: { superconnectors } };
	};
</script>

<script lang="ts">
	import type { Ask, Contestant } from '$types/models';
	import BulletinBoard from '$components/BulletinBoard/index.svelte';
	import LeaderBoard from '$components/LeaderBoard.svelte';
	let mode: 'master' | 'detail' = 'master';
	export let superconnectors: Contestant[];

	const resetGame = () => {
		gStore.reset();
		mode = 'master';
	};
</script>

<main class="md:p-8 md:pt-16 md:p-16 flex h-full flex-col justify-between">
	<div class="w-full h-full space-y-8 max-w-4xl mx-auto">
		<LeaderBoard leaderData={$leaderStore} />
		<BulletinBoard
			bind:mode
			on:toggleResolve={({ detail }) => gStore.toggleResolve(detail)}
			on:addSuperconnector={({ detail }) => gStore.addSuperconnector(detail)}
			on:changePoints={({ detail }) => gStore.changePoints(detail)}
			on:removeSuperconnector={(e) => gStore.removeSuperconnector(e.detail)}
			askData={$gStore}
			{superconnectors}
		/>
		<button class="font-mono font-semibold bg-red-200 p-4" on:click={resetGame}>Reset Game</button>
	</div>
</main>
