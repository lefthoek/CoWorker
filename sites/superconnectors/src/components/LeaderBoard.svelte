<script lang="ts">
	import type { Contestant } from '$types/models';
	import { fly, fade } from 'svelte/transition';
	export let leaderData: Contestant[] = [];
	import WidgetFrame from '$components/WidgetFrame.svelte';
</script>

<WidgetFrame>
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
