<script>
	import PointButtons from './PointButtons.svelte';
	import { words } from '../stores/index.js';

	export let word;
</script>

<div class="card">
	<div class="header">
		<h2>{word.word}</h2>
		<h2>{$words.find((w) => w.word === word.word)?.points || 0}</h2>
	</div>
	<p>{word.english}</p>
	<p class="italic">{word.pos}</p>
	<PointButtons {word} />
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 10.42px;
		border: 3px solid #add8e6;
		border-radius: 5.96px;
		align-items: left;
		padding: 5.96px;
		min-width: 225px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card:hover {
		border-color: #ffd700;
	}

	.card:hover h2 {
		color: #ffd700;
	}

	h2 {
		margin: 0px;
	}

	p {
		margin: 0px;
		width: fit-content;
	}
</style>
