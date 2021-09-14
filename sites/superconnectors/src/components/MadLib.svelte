<script lang="ts">
	import WidgetFrame from '$components/WidgetFrame.svelte';
	export let madlib = {
		value_proposition:
			'adding eye contact to video calling, increasing customer experience and therefore conversion. Done with simple plug&play hardware.',
		motivation: 'have +10 corporate customers in NL',
		outcome: 'take those learnings and grow abroad',
		date: 'June 2022',
		critical_weakness: "we don't have a full sales team to increase results for our effort",
		critical_ask:
			'advice / best practices / experiences / examples on increasing results of sales efforts and building sales teams',
		superconnectors_ask:
			'connections to people who did this before in the startup phase we are now in: first revenue, cost neutral',
		role: 'CEO/co-founder',
		name: 'Boudewijn van Sambeek',
		actions: ['follow-up on this ask']
	};
	let {
		value_proposition,
		motivation,
		outcome,
		date,
		critical_weakness,
		critical_ask,
		superconnectors_ask,
		role,
		name,
		actions
	} = madlib;
</script>

<WidgetFrame>
	<div class="col-span-10 space-y-4 text-background">
		<p>
			Our service or product is <span>{value_proposition}</span>
		</p>
		<p>We aim to <span>{motivation}</span></p>
		<p>
			so that we can <span>{outcome}</span> by
			<span>{date}</span>
		</p>
		<p>But <span>{critical_weakness}</span></p>
		<p>This is why we need <span>{critical_ask}</span></p>
		<p>
			We want the superconnectors to help us with
			<span>{superconnectors_ask}</span>
		</p>
		<p>
			<span>{role}</span>, <span>{name}</span> will be in charge of
			<span>{actions}</span>
		</p>
	</div>
</WidgetFrame>

<style>
	span {
		color: var(--brightGreen);
	}
</style>
