<script>
	import Tag from '$components/Tag.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let items = [];
	const selectTag = ({ id, selected }) => {
		dispatch('selectItem', { id, selected });
	};
</script>

<div class="space-y-4">
	{#if items.length}
		{#each items as { label, selected, id }}
			<Tag {selected} on:click={() => selectTag({ id, selected })}>{`${id}. ${label}`}</Tag>
		{/each}
	{:else}
		No one yet
	{/if}
</div>
