<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let label: string;

	const remove = (args: { label: string }) => {
		dispatch('remove', args);
	};
</script>

<span
	class="border-2 border-background px-4 p-2 text-background
              rounded-md text-center"
	>{label}
	<button on:click={() => remove({ label })} class="text-background">X</button></span
>
