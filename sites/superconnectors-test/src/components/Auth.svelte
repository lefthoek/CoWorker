<script lang="ts">
	import authStore from '$stores/auth';
	import Button from '$components/Button.svelte';
	let email: string;
	let password: string;
	let showForm = false;

	const login = () => {
		authStore.login({ email, password });
		showForm = false;
	};
</script>

{#if $authStore}
	<Button on:click={authStore.logout}>Logout</Button>
{:else if showForm}
	<form class="space-x-4" on:submit|preventDefault={login}>
		<Button on:click={() => (showForm = false)}>Cancel</Button>
		<input class="p-2" type="email" bind:value={email} placeholder="email" />
		<input class="p-2" type="password" bind:value={password} placeholder="password" />
		<Button type="submit">Login</Button>
	</form>
{:else}
	<Button on:click={() => (showForm = true)}>Login</Button>
{/if}
