<script lang="ts">
	import LeaderBoard from '$components/LeaderBoard.svelte';
	import leaderStore from '$stores/leaders';
</script>

<LeaderBoard fullscreen={true} leaderData={$leaderStore} />
