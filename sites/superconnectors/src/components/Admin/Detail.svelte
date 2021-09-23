<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Ask, Contestant } from '$types/models';
	import { countdown } from '$stores/time';
	import Toggle from '$components/Toggle.svelte';
	import Timer from '$components/Timer.svelte';
	import Score from '$components/Score.svelte';
	import TagGroup from '$components/TagGroup.svelte';
	import Button from '$components/Button.svelte';
	export let superconnectors: Contestant[];
	export let ask: Ask;

	function formatTime(ms: number) {
		const seconds = Math.ceil(ms / 1000);
		return seconds;
	}

	$: critical = $countdown < 410000;
	$: formatted = formatTime($countdown);

	const difference = (a: any[], b: any[] = []) => {
		return a.filter(
			({ contestant_id }) => !b.find(({ contestant_id: id }) => contestant_id === id)
		);
	};

	$: selectedSuperconnectors = ask.superconnectors.map(({ first_name, contestant_id }) => {
		return { label: first_name, selected: true, id: contestant_id };
	});

	$: availableSuperconnectors = difference(superconnectors, ask.superconnectors).map(
		({ first_name, contestant_id }) => {
			return { label: first_name, selected: false, id: contestant_id };
		}
	);

	const dispatch = createEventDispatcher();
	const toggleResolve = () => dispatch('toggleResolve', ask);

	const handleSelect = ({ id, selected }: { id: number; selected: boolean }) => {
		const superconnector = superconnectors.filter(({ contestant_id }) => contestant_id === id)[0];
		selected
			? dispatch('removeSuperconnector', { ask, superconnector })
			: dispatch('addSuperconnector', { ask, superconnector });
	};

	const changePoints = ({
		action,
		points
	}: {
		action: 'increase' | 'reduce' | 'set';
		points: number;
	}) => {
		console.log(action);
		dispatch('changePoints', { action, points, ask });
	};
</script>

<div class="font-mono font-normal text-1xl md:text-1xl space-y-6">
	<div class="flex text-3xl text-background align-middle md:text-4xl font-semibold justify-between">
		<p>{ask.team}</p>
		<Score on:changePoints={({ detail }) => changePoints(detail)} points={ask.points} />
		<Toggle class="ml-4" on:toggle={toggleResolve} checked={ask.resolved} />
	</div>
	<TagGroup on:selectItem={({ detail }) => handleSelect(detail)} items={selectedSuperconnectors} />
	<TagGroup on:selectItem={({ detail }) => handleSelect(detail)} items={availableSuperconnectors} />
	<Button on:click={countdown.start}>Start Timer</Button>
	<Timer />
	<Button on:click={countdown.stop}>Stop Timer</Button>
</div>

<style>
	p {
		user-select: none;
	}
</style>
