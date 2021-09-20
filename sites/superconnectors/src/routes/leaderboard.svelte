<script lang="ts">
	import LeaderBoard from '$components/LeaderBoard.svelte';
	import leaderStore from '$stores/leaders';
</script>

<main class="md:p-8 md:pt-16 md:p-16 flex h-full flex-col justify-between">
	<div class="w-full h-full space-y-8 max-w-4xl mx-auto">
		<LeaderBoard leaderData={$leaderStore} />
	</div>
</main>
