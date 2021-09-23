<script lang="ts">
	import LeaderBoard from '$components/LeaderBoard.svelte';
	import leaderStore from '$stores/leaders';
	import Timer from '$components/Timer.svelte';
</script>

<LeaderBoard fullscreen={true} leaderData={$leaderStore}>
	<Timer minutes={7} slot="footer" />
</LeaderBoard>
