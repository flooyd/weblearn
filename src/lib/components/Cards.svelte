<script>
	import { learningMaterial, filters } from '../stores/index.js';
	import Card from './Card.svelte';

	console.log('learningMaterial', $learningMaterial);
</script>

<div class="cards">
	{#each $learningMaterial.data[$filters.level] as word}
		<Card {word} />
	{/each}
</div>

<style>
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		gap: 10.42px;
	}
</style>
