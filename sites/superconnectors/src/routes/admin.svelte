<script context="module" lang="ts">
	import gStore from '../stores/game';
	export const load = async ({ fetch }) => {
		const asks_promise = fetch('/asks.json');
		const sc_promise = fetch('/superconnectors.json');
		const [asks_res, sc_res] = await Promise.all([asks_promise, sc_promise]);
		const [askData, superconnectors]: [Ask[], Contestant[]] = await Promise.all([
			asks_res.json(),
			sc_res.json()
		]);
		return { props: { superconnectors, askData } };
	};
</script>

<script lang="ts">
	import type { Ask, Contestant } from '$types/models';
	import Auth from '$components/Auth.svelte';
	import Admin from '$components/Admin/index.svelte';
	import WidgetFrame from '$components/WidgetFrame.svelte';
	import authStore from '$stores/auth';

	export let askData: Ask[];
	export let superconnectors: Contestant[];
	let mode: 'master' | 'detail' = 'master';

	const startGame = () => {
		gStore.init(askData);
	};
	const resetGame = () => {
		gStore.init(askData);
		mode = 'master';
	};
</script>

{#if true || $authStore}
	<Admin
		fullscreen={true}
		bind:mode
		on:startGame={startGame}
		on:resetGame={resetGame}
		on:toggleResolve={({ detail }) => gStore.toggleResolve(detail)}
		on:addSuperconnector={({ detail }) => gStore.addSuperconnector(detail)}
		on:changePoints={({ detail }) => gStore.changePoints(detail)}
		on:removeSuperconnector={(e) => gStore.removeSuperconnector(e.detail)}
		askData={$gStore}
		{superconnectors}
	/>
{:else}
	<WidgetFrame fullscreen={true}>
		<Auth />
	</WidgetFrame>
{/if}
