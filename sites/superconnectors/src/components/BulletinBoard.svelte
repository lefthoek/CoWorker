<script lang="ts">
	import type { Ask } from '$types/models';
	export let askData: Ask[] = [];
	import LefthoekLogo from '$components/LefthoekLogo.svelte';
</script>

<div class="bg-dark h-full md:h-auto pt-16 p-8 grid grid-cols-10 gap-4 md:rounded-md">
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
	<div class="col-span-10 mt-5 flex justify-end md:justify-start">
		<LefthoekLogo isInverted={true} class="w-12" />
	</div>
</div>
