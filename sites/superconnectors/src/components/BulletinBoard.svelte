<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Ask } from '$types/models';
	export let askData: Ask[] = [];
	import WidgetFrame from '$components/WidgetFrame.svelte';
	const dispatch = createEventDispatcher();
	const onClick = (index: number) => dispatch('resolved', { index });
</script>

<WidgetFrame>
	{#each askData as { team, summary, points, resolved }, index}
		<h1
			class:resolved
			class="font-mono col-span-4 font-normal text-1xl
      md:text-2xl"
		>
			{team}
		</h1>
		<h1
			on:click={() => onClick(index)}
			class:resolved
			class="font-mono col-span-4 font-normal text-1xl
      md:text-2xl"
		>
			{summary}
		</h1>
		<h1
			class:resolved
			class="font-mono col-span-2 text-right font-semibold
      text-1xl md:text-2xl"
		>
			{points}
		</h1>
	{/each}
</WidgetFrame>

<style>
	h1 {
		color: var(--brightGreen);
		user-select: none;
	}
	.resolved {
		opacity: 0.1;
	}
</style>
