<script lang="ts">
	import authStore from '$stores/auth';
	import Button from '$components/Button.svelte';
	let email: string;
	let password: string;
	let showForm = true;

	const login = () => {
		authStore.login({ email, password });
		showForm = false;
	};
</script>

{#if $authStore}
	<Button on:click={authStore.logout}>Logout</Button>
{:else if showForm}
	<form class="flex flex-col h-full space-y-4 justify-center" on:submit|preventDefault={login}>
		<input
			class="bg-dark border border-background p-3 rounded-md text-background"
			type="email"
			bind:value={email}
			placeholder="email"
		/>
		<input
			class="bg-dark border border-background p-3 text-background rounded-md"
			type="password"
			bind:value={password}
			placeholder="password"
		/>
		<Button type="submit">Login</Button>
	</form>
{/if}

<style>
	input {
		color: var(--brightGreen);
	}
</style>
