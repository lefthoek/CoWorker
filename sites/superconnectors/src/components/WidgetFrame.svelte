<script lang="ts">
	import LefthoekLogo from '$components/LefthoekLogo.svelte';
</script>

<div class="bg-dark h-full md:h-auto pt-16 p-8 grid grid-cols-10 gap-4 md:rounded-md">
	<slot />
	<div class="col-span-10 mt-5 flex justify-end">
		<LefthoekLogo isInverted={true} class="w-12" />
	</div>
</div>
