<script lang="ts">
	import BulletinBoard from '$components/Bulletinboard.svelte';
	import gStore from '$stores/gameData';
	import Timer from '$components/Timer.svelte';

	$: asks = Object.values($gStore).sort((a, b) => b.points - a.points);
</script>

<BulletinBoard fullscreen={true} askData={asks}>
	<Timer slot="footer" />
</BulletinBoard>
