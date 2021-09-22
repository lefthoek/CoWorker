<script lang="ts">
	import Madlib from '$components/Madlib.svelte';
</script>

<main class="md:p-8 md:pt-16 md:p-16 flex h-full flex-col justify-between">
	<slot />
	<div class="w-full h-full max-w-4xl mx-auto">
		<Madlib />
	</div>
</main>
