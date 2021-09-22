<script lang="ts">
	import type { Ask, Contestant } from '$types/models';
	import Button from '$components/Button.svelte';
	import Detail from './Detail.svelte';
	import BulletinBoard from '../BulletinBoard.svelte';
	import WidgetFrame from '$components/WidgetFrame.svelte';

	export let fullscreen = false;
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
</script>

{#if mode === 'master'}
	<BulletinBoard {fullscreen} on:detail={({ detail }) => onClick(detail.index)} {askData} />
{:else}
	<WidgetFrame {fullscreen}>
		<Detail
			{askIndex}
			{superconnectors}
			ask={askData[askIndex]}
			on:toggleResolve
			on:changePoints
			on:removeSuperconnector
			on:addSuperconnector
			on:back
		/>

		<div slot="footer">
			{#if mode === 'detail'}
				<Button on:click={onBack}>Go Back</Button>
			{/if}
		</div>
	</WidgetFrame>
{/if}
