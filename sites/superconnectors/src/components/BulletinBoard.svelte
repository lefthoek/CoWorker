<script lang="ts">
	import type { Ask } from '$types/models';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import WidgetFrame from '$components/WidgetFrame.svelte';
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
			class="font-mono font-normal text-1xl md:text-2xl grid pb-1 grid-cols-10
      border-b border-black"
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
	<slot name="footer" slot="footer" />
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
