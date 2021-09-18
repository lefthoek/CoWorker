<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Ask } from '$types/models';
	import Toggle from '$components/Toggle.svelte';
	import Tag from '$components/Tag.svelte';
	const dispatch = createEventDispatcher();
	export let ask: Ask;
	export let askIndex: number;
	let name: string = '';

	const toggleResolve = () => dispatch('toggleResolve', { index: askIndex });

	const removeSuperconnector = ({ label }: { label: string }) =>
		dispatch('removeSuperconnector', { name: label, index: askIndex });

	const addSuperconnector = () => {
		if (name !== '') {
			dispatch('addSuperconnector', { index: askIndex, name });
			name = '';
		}
	};
</script>

<div class="font-mono font-normal text-1xl md:text-1xl space-y-5">
	<p class="flex text-3xl align-middle md:text-4xl font-semibold">
		{ask.team}
		<Toggle class="ml-4" on:toggle={toggleResolve} checked={ask.resolved} />
	</p>
	<p class="space-x-4">
		{#if ask.superconnectors.length}
			{#each ask.superconnectors as { first_name }}
				<Tag on:remove={({ detail }) => removeSuperconnector(detail)} label={first_name} />
			{/each}
		{:else}
			No one yet
		{/if}
	</p>
	<form on:submit|preventDefault={addSuperconnector}>
		<input type="text" bind:value={name} />
		<label class="flex space-x-2">
			<button class="mt-4 text-white" type="submit">Add SuperConnector</button>
		</label>
	</form>
</div>

<style>
	p {
		color: var(--brightGreen);
		user-select: none;
	}
</style>
