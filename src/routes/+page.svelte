<script>
	import { onMount } from 'svelte';
	import Nav from '../lib/components/Nav.svelte';
	import { selectedSubject, user } from '../lib/stores/index';
	import Subjects from '../lib/components/Subjects.svelte';
	import spanish from '../lib/data/spanish.json';
	import ListWord from '../lib/components/ListWord.svelte';

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
			$user = result.data;
			localStorage.setItem('user', JSON.stringify(result.data));
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
			<h2>Welcome to WebLearn</h2>
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
		{/if}
		{#if $selectedSubject === 'Spanish'}
			{#each spanish[1] as word}
				<ListWord {word} />
			{/each}
		{/if}
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Lora:wght@400;700&display=swap');
	

	form {
		display: flex;
		gap: 10.42px;
		flex-direction: column;
		border: 4px solid #add8e6;
		margin-top: 21.6px;
		border-radius: 5.96px;
		padding: 21.6px;
		max-width: 50%;
		min-width: 300px;
	}

	button {
		width: 192px;
		text-align: left;
	}
</style>
