<script lang="ts">
	import type { Contestant } from '$types/models';
	export let leaderData: Contestant[] = [];
	import LefthoekLogo from '$components/LefthoekLogo.svelte';
</script>

<div class="bg-dark h-full md:h-auto pt-16 p-8 grid grid-cols-10 gap-4 md:rounded-md">
	{#each leaderData as { first_name, contestant_id, score }}
		<h1 class="font-mono text-background font-normal text-2xl md:text-3xl">
			{contestant_id}
		</h1>
		<h1 class="font-mono text-background col-span-7 font-normal text-2xl md:text-3xl">
			{first_name}
		</h1>
		<h1 class="font-mono text-background col-span-2 text-right font-semibold text-2xl md:text-3xl">
			{score}
		</h1>
	{/each}
	<div class="col-span-10 mt-5 flex justify-end md:justify-start">
		<LefthoekLogo isInverted={true} class="w-12" />
	</div>
</div>
