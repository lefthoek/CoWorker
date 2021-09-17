<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Detail from './Detail.svelte';
	import Master from './Master.svelte';
	import type { Ask } from '$types/models';
	import WidgetFrame from '$components/WidgetFrame.svelte';
	const dispatch = createEventDispatcher();

	export let askData: Ask[] = [];
	export let mode: string = 'master';
	export let askIndex: number;

	const onBack = () => {
		mode = 'master';
		askIndex = null;
	};

	const onClick = (index?: number) => {
		mode = 'detail';
		askIndex = index;
	};

	const resolve = (index?: number) => {
		dispatch('resolve', { index });
	};
	const addSuperconnector = (index?: number) => {
		dispatch('addSuperconnector', { index });
	};
</script>

<WidgetFrame>
	{#if mode === 'master'}
		<Master on:detail={({ detail }) => onClick(detail.index)} {askData} />
	{:else}
		<Detail
			{askIndex}
			ask={askData[askIndex]}
			on:resolve={({ detail }) => resolve(detail.index)}
			on:addSuperconnector={({ detail }) => addSuperconnector(detail.index)}
			on:back={onBack}
		/>
	{/if}
</WidgetFrame>
