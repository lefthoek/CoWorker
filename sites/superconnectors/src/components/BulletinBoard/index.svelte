<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Detail from './Detail.svelte';
	import Master from './Master.svelte';
	import type { Ask, Contestant } from '$types/models';
	import WidgetFrame from '$components/WidgetFrame.svelte';
	const dispatch = createEventDispatcher();

	export let askData: Ask[] = [];
	export let mode: 'master' | 'detail' = 'master';
	export let superconnectors: Contestant[];
	let askIndex: number;

	const onBack = () => {
		mode = 'master';
		askIndex = null;
	};

	const onClick = (index: number) => {
		mode = 'detail';
		askIndex = index;
	};

	const toggleResolve = (args: { index: number }) => {
		dispatch('toggleResolve', args);
	};
	const addSuperconnector = (args: { index: number; superconnector: Contestant }) => {
		dispatch('addSuperconnector', args);
	};

	const removeSuperconnector = (args: { index: number; name: string }) => {
		dispatch('removeSuperconnector', args);
	};
</script>

<WidgetFrame>
	{#if mode === 'master'}
		<Master on:detail={({ detail }) => onClick(detail.index)} {askData} />
	{:else}
		<Detail
			{askIndex}
			{superconnectors}
			ask={askData[askIndex]}
			on:toggleResolve={({ detail }) => toggleResolve(detail)}
			on:removeSuperconnector={({ detail }) => removeSuperconnector(detail)}
			on:addSuperconnector={({ detail }) => addSuperconnector(detail)}
			on:back={onBack}
		/>
	{/if}

	<div slot="footer">
		{#if mode === 'detail'}
			<button
				class="border-2 border-background px-4 p-2 text-background
              rounded-md text-center"
				on:click={onBack}>Go Back</button
			>
		{/if}
	</div>
</WidgetFrame>
