<script lang="ts">
	import type { Contestant } from '$types/models';
	import { fly, fade } from 'svelte/transition';
	export let leaderData: Contestant[] = [];
	export let fullscreen = false;
	import WidgetFrame from '$components/WidgetFrame.svelte';
</script>

<WidgetFrame {fullscreen}>
	{#if !leaderData.length}
		<div
			transition:fade
			class="text-background font-mono font-normal text-2xl md:text-3xl grid grid-cols-10"
		>
			<p transition:fly={{ y: -100 }} class="col-span-10 text-center">Game Hasn't Started Yet</p>
		</div>
	{/if}
	{#each leaderData as { first_name, last_name, score }, index}
		<div
			transition:fade
			class="text-background font-mono font-normal text-2xl gap-x-1 md:text-3xl grid grid-cols-10"
		>
			<p transition:fly={{ y: 100 }} class="col-span-1 font-semibold">
				{index + 1}
			</p>
			<p transition:fly={{ y: -100 }} class="col-span-6">
				{first_name}
				{last_name}
			</p>
			<p transition:fly={{ y: 100 }} class="col-span-3 text-right font-semibold">
				{score}
			</p>
		</div>
	{/each}
</WidgetFrame>

<style>
	p {
		color: var(--brightGreen);
		user-select: none;
	}
</style>
