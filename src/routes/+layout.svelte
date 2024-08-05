<script>
	import { onMount } from 'svelte';
	import Nav from '../lib/components/Nav.svelte';

	let ready = false;

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<Nav />
	<main>
		<slot />
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
		background-color: #1a1a1a;
		color: white;
	}

	main {
		padding: 15px;
	}

	:global(h1, h2, h3, span) {
		font-family: 'Montserrat', sans-serif;
		font-weight: bold;
		font-size: 21.6px;
	}

	:global(h2) {
		font-size: 18px;
		color: #add8e6;
	}

	:global(h3) {
		font-size: 15px;
	}

	:global(button) {
		padding: 5.96px;
		font-size: 15px;
		color: white;
		border: 2px solid #add8e6;
		border-radius: 5.96px;
	}

	:global(button:hover) {
		background-color: #808080;
		color: white;
		cursor: pointer;
	}

	:global(input) {
		padding: 5.96px 7.18px;
		border: 3px solid transparent;
		font-family: 'Lora', serif;
	}

	:global(input:focus) {
		border-color: yellow;
	}

	:global(a) {
		text-decoration: none;
		color: white;
	}

	:global(a:hover) {
		color: yellow;
	}

	:global(.error) {
		color: red;
	}

	@media (max-width: 600px) {
		:global(h1) {
			font-size: 18px;
		}
		:global(h2) {
			font-size: 15px;
		}
		:global(h3, button) {
			font-size: 12.5px;
		}
		:global(button:hover) {
			background: yellow;
			color: black;
			border-color: black;
		}
		:global(form) {
			max-width: 100%;
		}
		:global(.title, .title span) {
			font-size: 21.6px !important;
		}
	}
</style>
