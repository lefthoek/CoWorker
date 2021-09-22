<script>
	export let type = 'button';
</script>

<button {type} class="font-mono font-semibold bg-red-200 p-4" on:click><slot /></button>
