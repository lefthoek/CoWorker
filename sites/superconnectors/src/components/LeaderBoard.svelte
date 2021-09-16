<script lang="ts">
	import type { Contestant } from '$types/models';
	export let leaderData: Contestant[] = [];
	import WidgetFrame from '$components/WidgetFrame.svelte';
</script>

<WidgetFrame>
	{#each leaderData as { first_name, score }}
		<h1 class="font-mono text-background col-span-7 font-normal text-2xl md:text-3xl">
			{first_name}
		</h1>
		<h1 class="font-mono text-background col-span-3 text-right font-semibold text-2xl md:text-3xl">
			{score}
		</h1>
	{/each}
</WidgetFrame>
