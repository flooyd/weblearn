<script>
	import { selectedSubject, learningMaterial } from '../stores/index.js';
	console.log('learningMaterial', $learningMaterial);
</script>

<div class="pronunciations">
	{#each $learningMaterial.data.pronunciations as word}
		<div class="pronunciation">
			<h2>{word.letter}</h2>
			<p>-</p>
			<p>{word.english}</p>
			<p>-</p>
			<p>{word.pronunciation}</p>
		</div>
	{/each}
</div>

<style>
	.pronunciations {
		display: flex;
		flex-direction: column;
		gap: 5.96px;
	}

	.pronunciation {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		gap: 5.96px;
		border-bottom: 2px solid #add8e6;
		width: 300px;
	}
</style>
