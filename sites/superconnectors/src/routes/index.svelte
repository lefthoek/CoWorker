<script lang="ts">
	import LefthoekLogo from '$components/LefthoekLogo.svelte';
</script>

<main class="pt-16 p-8 flex h-full flex-col justify-between">
	<div class="flex flex-col space-y-8">
		<a class="font-mono font-semibold text-2xl" href="/bulletinboard">Bulletinboard</a>
		<a class="font-mono font-semibold text-2xl" href="/leaderboard">Leaderboard</a>
	</div>
	<div class="col-span-10 mt-5 flex justify-end">
		<LefthoekLogo class="w-12" />
	</div>
</main>
