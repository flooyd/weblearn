<script>
	import { learningMaterial, level } from '../stores/index.js';
	import Flashcard from './Flashcard.svelte';

	console.log('learningMaterial', $learningMaterial);
</script>

<div class="flashcards">
	{#each $learningMaterial.data[$level] as word}
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
