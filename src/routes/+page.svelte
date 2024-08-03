<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from '../lib/components/Nav.svelte';
	import { selectedSubject, user } from '../lib/stores/index';
	import Subjects from '../lib/components/Subjects.svelte';
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
	<Nav />
	<main>
		{#if !$user}
			<div class="intro">
				<h2>Welcome to WebLearn</h2>
				<p>Sign in or register to continue</p>
			</div>
			<form on:submit|preventDefault={handleAuth}>
				<input type="text" bind:value={credentials.username} placeholder="Username" required />
				<input type="password" bind:value={credentials.password} placeholder="Password" required />
				<button type="submit">{isLogin ? 'Login' : 'Register'}</button>
				<button type="button" on:click={toggleAuthMode}>
					{isLogin ? 'Need to register?' : 'Already have an account?'}
				</button>
			</form>
		{/if}
		{#if $user}
			<Subjects />
		{/if}
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</main>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Lora:wght@400;700&display=swap');
	:global(*) {
		box-sizing: border-box;
		font-family: 'Lora', serif;
		padding: 0px;
		outline: none;
		border: none;
		margin: 0px;
		font-size: 15px;
		background-color: #1a1a1a; /* Dark Black */
		color: white;
	}

	:global(h1, h2, span) {
		font-family: 'Montserrat', sans-serif;
		font-weight: bold;
		font-size: 25.92px;
		margin-bottom: 21.6px;
	}

	:global(h2) {
		font-size: 21.6px;
		color: #add8e6; /* Light Blue */
	}

	:global(button) {
		padding: 5.96px 7.18px;
		font-size: 18px;
		color: white;
		border: 2px solid #add8e6;
		border-radius: 5.96px;
	}

	:global(button:hover) {
		background-color: #808080; /* Gray */
		color: white;
		cursor: pointer;
	}

	:global(input) {
		padding: 5.96px 7.18px;
		border: 2px solid #add8e6;
	}

	main {
		padding: 21.6px;
	}

	form {
		display: flex;
		flex-direction: column;
		border: 4px solid #add8e6;
		margin-top: 21.6px;
		border-radius: 5.96px;
		padding: 21.6px;
		max-width: 50%;
	}

	input {
		margin-bottom: 1rem;
	}

	button {
		margin-bottom: 1rem;
		width: fit-content;
	}

	.error {
		color: red;
	}
</style>
