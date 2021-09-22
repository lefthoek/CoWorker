<script lang="ts">
	import SuperConnectorsLogo from '$components/SuperConnectorsLogo.svelte';
</script>

<main class="p-8 py-16 md:p-16 flex h-full flex-col justify-between">
	<div class="w-full md:w-1/3">
		<SuperConnectorsLogo />
	</div>
	<div class="flex flex-col">
		<a href="/leaderboard">Leader Board</a>
		<a href="/bulletinboard">Bulletin Board</a>
		<a href="/admin">Admin</a>
	</div>
</main>
