<script>
	import { user } from '../stores/index';
	import { goto } from '$app/navigation';

	const handleClickProfile = () => {
		//logout
		$user = null;
		localStorage.removeItem('user');
	};

	$: console.log($user);
</script>

<nav>
	<a href="/" class="title"><span>w</span>eb<span>L</span>earn</a>
	<div class="options">
		{#if $user}
			<a href="/" on:click={handleClickProfile}>{$user['username']}</a>
		{:else}
			<a href="/">Login/Register</a>
		{/if}
		<a href="/about">About</a>
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

	.title {
		font-size: 25.62px;
		font-weight: bold;
	}

	span {
		color: #add8e6; /* Light Blue for span */
	}

	.title:hover span {
		color: #ffd700;
	}

	.options {
		display: flex;
		align-items: center;
		gap: 10.42px;
		font-size: 18px;
	}
</style>
