<script>
	import { user } from '../stores/index';

	const logout = () => {
		user.set(null);
		localStorage.removeItem('user');
	};
</script>

<nav>
	<h1 class="title"><span>W</span>eb<span>L</span>earn</h1>
	<div class="options">
		<button>About</button>
		{#if $user}
			<button on:click={logout}>{$user.username}</button>
		{:else}
			<button>Login/Register</button>
		{/if}
		<button>Hide</button>
	</div>
</nav>

<style>
	nav {
		display: flex;
		padding: 5.96px 21.6px;
		justify-content: space-between;
		align-items: center;
		color: #ffffff; /* White for text */
		border-bottom: 3px solid #add8e6; /* Light Blue for border */
	}

	span {
		color: #add8e6; /* Light Blue for span */
	}

	h1 {
		margin: 0px;
	}

	.options {
		display: flex;
		gap: 10.42px;
		font-size: 18px;
	}

	.options div {
		cursor: pointer;
		color: #add8e6; /* Light Blue for options */
	}

	.options div:hover {
		color: #808080; /* Gray for hover effect */
	}
</style>
