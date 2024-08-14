<script>
	import PointButtons from './PointButtons.svelte';
	import { words } from '../stores/index.js';

	export let word;
	let front = true;
	console.log(front);
</script>

{#if front}
	<button class="flashcard front" on:click={() => (front = false)}>
		<div class="header">
			<h2>{word.word}</h2>
			<h2>{$words.find((w) => w.word === word.word)?.points || 0}</h2>
		</div>
	</button>
{:else}
	<button class="flashcard" on:click={() => (front = true)}>
		<div class="header">
			<h2>{word.word}</h2>
			<h2>{$words.find((w) => w.word === word.word)?.points || 0}</h2>
		</div>
		<p>{word.english}</p>
		<p class="italic">{word.pos}</p>
		<PointButtons {word} />
	</button>
{/if}

<style>
	.flashcard {
		display: flex;
		flex-direction: column;
		gap: 10.42px;
		border: 3px solid #add8e6;
		border-radius: 5.96px;
		align-items: left;
		padding: 5.96px;
		width: 30%;
		min-width: 225px;
		background-color: #1a1a1a;
		height: 140.13px;
	}

	.front {
		justify-content: center;
		align-items: center;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.flashcard:hover {
		border-color: #ffd700;
	}

	.flashcard:hover h2 {
		color: #ffd700;
	}

	h2 {
		margin: 0px;
		color: white;
	}

	p {
		margin: 0px;
		width: fit-content;
		font-weight: 400;
	}
</style>
