<script lang="ts">
	import { countdown } from '$stores/time';

	$: critical = $countdown ? $countdown < 180000 : false;

	function formatTime(ms: number) {
		const time = ms / 1000;
		var minutes = Math.floor(time / 60);
		var seconds = Math.ceil(time - minutes * 60);
		return `${minutes}:${seconds}`;
	}

	$: formatted = formatTime($countdown);
</script>

<div
	class:critical
	class="text-background font-mono font-semibold
  text-5xl"
>
	{#if $countdown}
		{formatted}
	{/if}
</div>

<style>
	.critical {
		color: var(--lobster);
	}
</style>
