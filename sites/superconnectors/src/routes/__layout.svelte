<script>
	import '../app.postcss';
	import authStore from '$stores/auth';
</script>

{#if $authStore}
	<button on:click={() => authStore.logout()}>Logout</button>
	<slot />
{:else}
	<button on:click={() => authStore.login()}>Login</button>
{/if}
