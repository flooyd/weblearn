<script>
	import { learningMaterial, level } from '../stores/index.js';
	import Card from './Card.svelte';
</script>

<div class="cards">
	{#each $learningMaterial.data[$level] as word}
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
