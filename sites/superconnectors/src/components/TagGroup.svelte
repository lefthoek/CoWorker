<script>
	import Tag from '$components/Tag.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let items = [];
	const selectTag = ({ label, selected }) => {
		dispatch('selectItem', { label, selected });
	};
</script>

<p class="space-x-4">
	{#if items.length}
		{#each items as { label, selected }}
			<Tag {selected} on:select={({ detail }) => selectTag(detail)} {label} />
		{/each}
	{:else}
		No one yet
	{/if}
</p>
