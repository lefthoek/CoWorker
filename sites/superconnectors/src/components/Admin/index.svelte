<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Ask, Contestant } from '$types/models';
	import Button from '$components/Button.svelte';
	import Detail from './Detail.svelte';
	import BulletinBoard from '$components/BulletinBoard.svelte';
	import WidgetFrame from '$components/WidgetFrame.svelte';

	const dispatch = createEventDispatcher();

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

	const resetGame = () => dispatch('resetGame');
	const startGame = () => dispatch('startGame');
</script>

{#if mode === 'master'}
	<BulletinBoard {fullscreen} on:detail={({ detail }) => onClick(detail.index)} {askData}>
		<div slot="footer">
			{#if askData.length}
				<Button on:click={resetGame}>Reset Game</Button>
			{:else}
				<Button on:click={startGame}>Start Game</Button>
			{/if}
		</div>
	</BulletinBoard>
{:else}
	<WidgetFrame {fullscreen}>
		<Detail
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
