<script lang="ts">
	import LefthoekLogo from '$components/LefthoekLogo.svelte';
	import SuperConnectorsLogo from '$components/SuperConnectorsLogo.svelte';
	export let fullscreen = false;
</script>

<div
	class:md:rounded-md={!fullscreen}
	class="bg-dark w-full h-full p-8 md:py-16 flex flex-col justify-between"
>
	<div class="mt-10 flex justify-between px-1 items-center">
		<a href="/" class="w-full md:w-1/6 mb-8">
			<SuperConnectorsLogo />
		</a>
		<slot name="header" />
	</div>
	<div
		class="space-y-3 md:py-8 px-8 h-3/4 border rounded-lg border-background
    overflow-y-scroll"
	>
		<slot />
	</div>
	<div class="mt-10 flex justify-between px-1 items-center">
		<slot name="footer" />
		<LefthoekLogo isInverted={true} class="w-12" />
	</div>
</div>

<style>
	div {
		background-color: var(--midnight);
	}
</style>
