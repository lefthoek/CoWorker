<script lang="ts">
	import LefthoekLogo from '$components/LefthoekLogo.svelte';
</script>

<div class="bg-dark h-full md:h-auto pt-16 p-8 md:rounded-md">
	<div class="space-y-8">
		<slot />
	</div>
	<div class="mt-10 flex justify-between">
		<div>
			<slot name="footer" />
		</div>
		<LefthoekLogo isInverted={true} class="w-12" />
	</div>
</div>
