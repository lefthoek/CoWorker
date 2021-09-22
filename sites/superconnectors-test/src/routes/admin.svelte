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
		return { props: { superconnectors, askData } };
	};
</script>

<script lang="ts">
	import type { Ask, Contestant } from '$types/models';
	import Auth from '$components/Auth.svelte';
	import Admin from '$components/Admin/index.svelte';
	import Button from '$components/Button.svelte';
	import authStore from '$stores/auth';
	import { db } from '../firebase';
	import { doc, setDoc } from 'firebase/firestore';

	export let askData: Ask[];
	export let superconnectors: Contestant[];
	let mode: 'master' | 'detail' = 'master';

	if (db) {
		gStore.subscribe((asks) => {
			for (const ask of asks) {
				console.log(ask);
				setDoc(doc(db, 'aks', ask.team), ask);
			}
		});
	}

	const startGame = () => {
		gStore.init(askData);
	};

	const resetGame = () => {
		gStore.reset();
		mode = 'master';
	};
</script>

{#if $authStore}
	<Admin
		fullscreen={true}
		bind:mode
		on:toggleResolve={({ detail }) => gStore.toggleResolve(detail)}
		on:addSuperconnector={({ detail }) => gStore.addSuperconnector(detail)}
		on:changePoints={({ detail }) => gStore.changePoints(detail)}
		on:removeSuperconnector={(e) => gStore.removeSuperconnector(e.detail)}
		askData={$gStore}
		{superconnectors}
	/>
{/if}
<div class="flex justify-between">
	<Auth />
	{#if $authStore}
		{#if $gStore.length === 0}
			<Button on:click={startGame}>Start Game</Button>
		{:else if $leaderStore.length > 0}
			<Button on:click={resetGame}>Reset Game</Button>
		{/if}
	{/if}
</div>
