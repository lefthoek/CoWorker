<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	export let minutes = 0;
	const dispatch = createEventDispatcher();
	const currentTime = Number(new Date());
	const deadline = Number(new Date(currentTime + minutes * 60 * 1000));
	const timer = writable(deadline - currentTime);

	let interval = null;

	$: critical = $timer < 410000;

	function formatTime(ms: number) {
		const seconds = Math.ceil(ms / 1000);
		return seconds;
	}

	$: formatted = formatTime($timer);

	onMount(() => {
		interval = setInterval(() => {
			const currentTime = Number(new Date());
			timer.set(deadline - currentTime);
		}, 1000);
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});

	$: {
		if ($timer === 0) {
			clearInterval(interval);
			timer.set(null);
			dispatch('completed');
		}
	}
</script>

<p class:critical class="text-background font-mono text-6xl">{formatted}</p>

<style>
	.critical {
		color: red;
	}
</style>
