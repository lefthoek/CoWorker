<script lang="ts">
	import BulletinBoard from '$components/Bulletinboard.svelte';
	import gStore from '$stores/gameData';

	$: asks = Object.values($gStore)
		.sort((a, b) => b.points - a.points)
		.sort((a, b) => a.resolved - b.resolved);
</script>

<BulletinBoard fullscreen={true} askData={asks} />
