<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Ask } from '$types/models';
	// import type { Ask } from '$types/models';
	const dispatch = createEventDispatcher();
	export let ask: Ask;
	export let askIndex: number;
	const onBack = () => {
		dispatch('back');
	};
	const resolve = () => {
		dispatch('resolve', { index: askIndex });
	};
	const addSuperconnector = () => {
		dispatch('addSuperconnector', { index: askIndex });
	};
</script>

<div>
	<p class="space-x-4">
		{#if ask.superconnectors.length}
			{#each ask.superconnectors as { first_name }}
				<span>{first_name}</span>
			{/each}
		{:else}
			No one yet
		{/if}
	</p>
	<label class="flex space-x-2">
		<button on:click={addSuperconnector}>Add SuperConnector</button>
	</label>
	<label class="flex space-x-2">
		<input type="checkbox" checked={ask.resolved} on:click={resolve} />
		<p>Resolve Ask</p>
	</label>
	<button class="mt-4" on:click={onBack}>Go Back</button>
</div>

<style>
	p {
		color: var(--brightGreen);
		user-select: none;
	}
	button {
		color: var(--brightGreen);
		user-select: none;
	}
</style>
