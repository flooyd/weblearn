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
		gap: 20px;
		padding: 20px 30px;
		justify-content: space-between;
		align-items: center;
		color: #ffffff;
		background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
		border-bottom: 4px solid #ffd700;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.title {
		font-size: 2.2em;
		font-weight: 700;
		font-family: 'Montserrat', sans-serif;
		text-decoration: none;
		color: #ffffff;
		transition: all 0.3s ease;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		letter-spacing: 1px;
	}

	.title:hover {
		transform: scale(1.05);
		text-shadow: 0 3px 6px rgba(255, 215, 0, 0.4);
	}

	span {
		color: #add8e6;
		font-size: 2.2em;
		transition: color 0.3s ease;
	}

	.title:hover span {
		color: #ffd700;
		text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
	}

	.options {
		display: flex;
		align-items: center;
		gap: 25px;
		font-size: 1.1em;
		font-weight: 500;
	}

	.options a {
		color: #e0e0e0;
		text-decoration: none;
		padding: 12px 18px;
		border-radius: 8px;
		transition: all 0.3s ease;
		border: 2px solid transparent;
		font-weight: 500;
		letter-spacing: 0.5px;
	}

	.options a:hover {
		color: #ffd700;
		background: rgba(255, 215, 0, 0.1);
		border-color: #ffd700;
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(255, 215, 0, 0.2);
	}

	@media (max-width: 768px) {
		nav {
			padding: 16px 20px;
			gap: 15px;
		}

		.title {
			font-size: 1.8em;
		}

		span {
			font-size: 1.8em;
		}

		.options {
			gap: 15px;
			font-size: 1em;
		}

		.options a {
			padding: 10px 14px;
		}
	}

	@media (max-width: 480px) {
		.options {
			flex-direction: column;
			gap: 10px;
		}

		.options a {
			padding: 8px 12px;
			font-size: 0.9em;
		}
	}
</style>
