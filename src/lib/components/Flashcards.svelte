<script>
	import { learningMaterial, filters, words, filteredWords } from '../stores/index.js';
	import Flashcard from './Flashcard.svelte';
	console.log($filteredWords);
</script>

<div class="flashcards">
	{#each $filteredWords as word}
		<Flashcard {word} />
	{/each}
</div>

<style>
	.flashcards {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		gap: 10.42px;
	}
</style>
