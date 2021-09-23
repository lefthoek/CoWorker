<script>
	import { createEventDispatcher } from 'svelte';
	export let points = 0;
	const dispatch = createEventDispatcher();
	const changePoints = () => {
		dispatch('changePoints', { action: 'set', points });
	};
	const increasePoints = () => {
		dispatch('changePoints', { action: 'increase' });
	};
	const reducePoints = () => {
		dispatch('changePoints', { action: 'reduce' });
	};
</script>

<div class="flex space-x-2">
	<button on:click={reducePoints}>-</button>
	<input
		class="bg-dark text-5xl font-semibold text-center"
		on:change={changePoints}
		type="number"
		min="1"
		max="99"
		bind:value={points}
	/>
	<button on:click={increasePoints}>+</button>
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
