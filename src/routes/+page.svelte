<script>
	import { onMount } from 'svelte';
	import { learningMaterial, selectedMethod, user } from '../lib/stores/index';
	import Subjects from '../lib/components/Subjects.svelte';
	import Flashcards from '../lib/components/Flashcards.svelte';
	import Pronunciations from '../lib/components/Pronunciations.svelte';
	import Toolbar from '../lib/components/Toolbar.svelte';

	let credentials = { username: '', password: '' };
	let error = '';
	let isLogin = true;
	let ready = false;

	async function handleAuth() {
		const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials)
		});

		const result = await response.json();
		console.log(result);
		if (result.success) {
			localStorage.setItem('user', JSON.stringify(result.data));
			$user = JSON.parse(localStorage.getItem('user'));
		} else {
			error = result.error || 'Authentication failed';
		}
	}

	function toggleAuthMode() {
		isLogin = !isLogin;
		error = '';
	}

	onMount(() => {
		if (localStorage.getItem('user')) {
			$user = JSON.parse(localStorage.getItem('user'));
		}
		ready = true;
	});
</script>

{#if ready}
	{#if !$user}
		<h2>Welcome to webLearn.</h2>
		<form on:submit|preventDefault={handleAuth}>
			<input type="text" bind:value={credentials.username} placeholder="Username" required />
			<input type="password" bind:value={credentials.password} placeholder="Password" required />
			<button type="submit">{isLogin ? 'Login' : 'Register'}</button>
			<button type="button" on:click={toggleAuthMode}>
				{isLogin ? 'Need to register?' : 'Already have an account?'}
			</button>
			{#if error}
				<p class="error">{error}</p>
			{/if}
		</form>
	{/if}
	{#if $user}
		<Subjects />
		{#if $learningMaterial}
			<Toolbar />
			{#if $selectedMethod === 'Flashcards'}
				<Flashcards />
			{/if}
			{#if $selectedMethod === 'Pronunciations'}
				<Pronunciations />
			{/if}
		{/if}
	{/if}
{/if}

<style>
	form {
		display: flex;
		gap: 10.42px;
		flex-direction: column;
		margin-top: 10.42px;
		border-radius: 5.96px;
		max-width: 50%;
		min-width: 300px;
	}

	button {
		width: 193px;
		text-align: left;
	}

	h2 {
		color: #ffd700;
	}
</style>
