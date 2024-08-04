<script>
	import { user } from '../stores/index';
	import { goto } from '$app/navigation';

	const handleClickProfile = () => {
		//logout
		user.set(null);
		localStorage.removeItem('user');
	};

	const handleClickAbout = () => {
		goto('/about');
	};

	const handleClickLogin = () => {
		goto('/');
	};
</script>

<nav>
	<h1 class="title"><span>w</span>eb<span>L</span>earn</h1>
	<div class="options">
		{#if $user}
			<button on:click={handleClickProfile}>{$user.username}</button>
		{:else}
			<button on:click={handleClickLogin}>Login/Register</button>
		{/if}
		<button on:click={handleClickAbout}>About</button>
	</div>
</nav>

<style>
	nav {
		display: flex;
		gap: 10.42px;
		padding: 5.96px 15px;
		justify-content: space-between;
		align-items: center;
		color: #ffffff; /* White for text */
		border-bottom: 3px solid #add8e6; /* Light Blue for border */
	}

	span {
		color: #add8e6; /* Light Blue for span */
	}

	.options {
		display: flex;
		gap: 10.42px;
		font-size: 18px;
	}
</style>
