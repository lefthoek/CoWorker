<script context="module" lang="ts">
	import { gStore, leaderStore } from '../stores';

	export const load = async ({ fetch }) => {
		const asks_promise = fetch('/asks.json');
		const sc_promise = fetch('/superconnectors.json');
		const [asks_res, sc_res] = await Promise.all([asks_promise, sc_promise]);
		const [askData, superconnectors] = await Promise.all([asks_res.json(), sc_res.json()]);
		gStore.init(askData);
		gStore.fake(superconnectors);
		return {};
	};
</script>

<script lang="ts">
	import BulletinBoard from '$components/BulletinBoard.svelte';
	import LeaderBoard from '$components/LeaderBoard.svelte';
</script>

<main class="md:p-8 md:pt-16 md:p-16 flex h-full flex-col justify-between">
	<div class="w-full h-full space-y-8 max-w-4xl mx-auto">
		<BulletinBoard on:resolved={(e) => gStore.resolveAsks(e.detail)} askData={$gStore} />
		<LeaderBoard leaderData={$leaderStore} />
	</div>
</main>
