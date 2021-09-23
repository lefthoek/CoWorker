<script lang="ts">
	import LeaderBoard from '$components/LeaderBoard.svelte';
	import leaderStore from '$stores/leaders';
	import { countdown } from '$stores/time';
	const formatter = new Intl.DateTimeFormat('en', {
		hour12: false,
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<LeaderBoard fullscreen={true} leaderData={$leaderStore}>
	<p class="text-background font-mono text-3xl" slot="header">LeaderBoard</p>
	<p class="text-background font-mono text-3xl" slot="footer">{formatter.format($countdown)}</p>
</LeaderBoard>
