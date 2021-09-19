<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let label: string;
	export let selected: boolean = false;

	const select = () => {
		dispatch('select', { label, selected });
	};
</script>

{#if selected}
	<button
		on:click={select}
		class="border-2 border-background px-4 p-2 bg-background text-dark
              rounded-md text-center"
		>{label}
	</button>
{:else}
	<button
		on:click={select}
		class="border-2 border-background px-4 p-2 text-background
              rounded-md text-center"
		>{label}
	</button>
{/if}
