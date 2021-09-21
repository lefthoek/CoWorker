<script lang="ts">
	import WidgetFrame from '$components/WidgetFrame.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Ask } from '$types/models';
	export let askData: Ask[] = [];
	export let fullscreen = false;
	const dispatch = createEventDispatcher();
	const onClick = (index?: number) => {
		dispatch('detail', { index });
		return;
	};
</script>

<WidgetFrame {fullscreen}>
	{#each askData as { team, summary, points, resolved }, index}
		<div
			on:click={() => onClick(index)}
			class:resolved
			transition:fade
			class="font-mono font-normal text-1xl md:text-2xl grid grid-cols-10"
		>
			<p class="col-span-4">
				{team}
			</p>
			<p class="col-span-4 ">
				{summary}
			</p>
			<p class="col-span-2 text-right font-semibold">
				{points}
			</p>
		</div>
	{/each}
</WidgetFrame>

<style>
	p {
		color: var(--brightGreen);
		user-select: none;
	}
	.resolved {
		opacity: 0.1;
	}
</style>
