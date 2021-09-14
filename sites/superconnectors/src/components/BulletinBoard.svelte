<script lang="ts">
	import type { Ask } from '$types/models';
	export let askData: Ask[] = [];
	import WidgetFrame from '$components/WidgetFrame.svelte';
</script>

<WidgetFrame>
	{#each askData as { team, summary, points }}
		<h1
			class="font-mono text-background col-span-4 font-normal text-1xl
      md:text-2xl"
		>
			{team}
		</h1>
		<h1
			class="font-mono text-background col-span-4 font-normal text-1xl
      md:text-2xl"
		>
			{summary}
		</h1>
		<h1
			class="font-mono text-background col-span-2 text-right font-semibold
      text-1xl md:text-2xl"
		>
			{points}
		</h1>
	{/each}
</WidgetFrame>
