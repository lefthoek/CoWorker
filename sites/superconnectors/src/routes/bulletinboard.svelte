<script lang="ts">
	import BulletinBoard from '$components/Bulletinboard.svelte';
	import gStore from '$stores/gameData';
</script>

<BulletinBoard fullscreen={true} askData={$gStore} />
