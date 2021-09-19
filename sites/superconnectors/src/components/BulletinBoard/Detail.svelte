<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Ask, Contestant } from '$types/models';
	import Toggle from '$components/Toggle.svelte';
	import Score from '$components/Score.svelte';
	import TagGroup from '$components/TagGroup.svelte';
	export let superconnectors: Contestant[];
	export let ask: Ask;
	export let askIndex: number;

	const difference = (a: any[], b: any[] = []) => {
		const aSet = new Set(a);
		const bSet = new Set(b || []);
		return [...aSet].filter((x) => !bSet.has(x));
	};

	$: selectedSuperconnectors = ask.superconnectors.map(({ first_name }) => {
		return { label: first_name, selected: true };
	});

	$: availableSuperconnectors = difference(superconnectors, ask.superconnectors).map(
		({ first_name }) => {
			return { label: first_name, selected: false };
		}
	);

	const dispatch = createEventDispatcher();
	const toggleResolve = () => dispatch('toggleResolve', { index: askIndex });

	const handleSelect = ({ label, selected }: { label: string; selected: boolean }) => {
		console.log(askIndex, label, selected);
		const superconnector = superconnectors.filter(({ first_name }) => first_name === label)[0];
		selected
			? dispatch('removeSuperconnector', { name: label, index: askIndex })
			: dispatch('addSuperconnector', { index: askIndex, superconnector });
	};

	const changePoints = ({
		action,
		points
	}: {
		action: 'increase' | 'reduce' | 'set';
		points: number;
	}) => {
		dispatch('changePoints', { action, points, index: askIndex });
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
</div>

<style>
	p {
		user-select: none;
	}
</style>
