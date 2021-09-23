<script lang="ts">
	import { countdown } from '$stores/time';

	$: critical = $countdown < 410000;

	function formatTime(ms: number) {
		const seconds = Math.ceil(ms / 1000);
		return seconds;
	}

	$: formatted = formatTime($countdown);
</script>

<div
	class:critical
	class="text-background font-mono font-semibold
  text-5xl"
>
	{formatted}
</div>

<style>
	.critical {
		color: var(--lobster);
	}
</style>
