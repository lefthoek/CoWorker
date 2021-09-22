<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
</script>

<button
	{type}
	on:click
	class="border border-background px-4 p-2 hover:bg-background hover:text-dark text-background
              rounded-md text-center"
>
	<slot />
</button>
