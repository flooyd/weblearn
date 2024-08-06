<script>
	import { learningMaterial, filters, words } from '../stores/index.js';
	import Flashcard from './Flashcard.svelte';

	const getFilteredWords = () => {
		let filteredWords = [];
		const learningMaterialWords = $learningMaterial.data[$filters.level];
		for (let i = 0; i < $words.length; i++) {
			const word = $words[i];
			if (word.points === 100) {
				filteredWords.push(learningMaterialWords.find((w) => w.word === word.word));
			}
		}

		return filteredWords;
	};
</script>

<div class="flashcards">
	{#each getFilteredWords() as word}
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
