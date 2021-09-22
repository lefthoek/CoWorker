<script lang="ts">
	import LefthoekLogo from '$components/LefthoekLogo.svelte';
	import SuperConnectorsLogo from '$components/SuperConnectorsLogo.svelte';
	export let fullscreen = false;
</script>

<div
	class:md:rounded-md={!fullscreen}
	class="bg-dark w-full h-full p-8 md:p-16 flex flex-col justify-between"
>
	<div class="w-full md:w-1/6 mb-8">
		<SuperConnectorsLogo />
	</div>
	<div class="space-y-8 md:p-32 h-3/4 border rounded-lg border-background">
		<slot />
	</div>
	<div class="mt-10 flex justify-between">
		<div>
			<slot name="footer" />
		</div>
		<LefthoekLogo isInverted={true} class="w-12" />
	</div>
</div>
