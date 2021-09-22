<script lang="ts">
	export let selected: boolean = false;
</script>

{#if selected}
	<button
		on:click
		class="border mr-4 border-background px-4 p-2 bg-background text-dark
              rounded-md text-center"
		><slot />
	</button>
{:else}
	<button
		on:click
		class="border mr-4 border-background px-4 p-2 text-background
              rounded-md text-center"
		><slot />
	</button>
{/if}
