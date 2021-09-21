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
	{#each leaderData as { first_name, score }}
		<div
			transition:fade
			class="text-background font-mono font-normal text-2xl md:text-3xl grid grid-cols-10"
		>
			<p transition:fly={{ y: -100 }} class="col-span-7 ">
				{first_name}
			</p>
			<p transition:fly={{ y: 100 }} class="col-span-3 text-right font-semibold">
				{score}
			</p>
		</div>
	{/each}
</WidgetFrame>
