<script>
	import { learningMaterial, filters, words, filteredWords } from '../stores/index.js';
	import PointButtons from './PointButtons.svelte';
	console.log($filteredWords);
</script>

<div class="list-words">
	{#each $filteredWords as word}
		<div class="word-card">
			<div class="word-info">
				<div class="word-main">
					<h2 class="foreign-word">{word.word}</h2>
					<span class="pos-tag">{word.pos}</span>
				</div>
				<p class="english-translation">{word.english}</p>
			</div>
			<div class="points-section">
				<div class="points-display">
					<span class="points-label">Points</span>
					<span class="points-value">{$words.find((w) => w.word === word.word)?.points || 0}</span>
				</div>
				<PointButtons {word} />
			</div>
		</div>
	{/each}
</div>

<style>
	.list-words {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 10px 0;
	}

	.word-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		border: 2px solid #add8e6;
		border-radius: 8px;
		padding: 16px 20px;
		background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.word-card:hover {
		border-color: #ffd700;
		box-shadow: 0 4px 8px rgba(255, 215, 0, 0.2);
		transform: translateY(-1px);
	}

	.word-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}

	.word-main {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.foreign-word {
		margin: 0;
		color: #ffd700;
		font-size: 1.5em;
		font-weight: 600;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	.pos-tag {
		background: #add8e6;
		color: #1a1a1a;
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 0.75em;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.english-translation {
		margin: 0;
		color: #e0e0e0;
		font-size: 1.1em;
		font-style: italic;
		line-height: 1.4;
	}

	.points-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		min-width: 160px;
		flex-shrink: 0;
	}

	.points-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 8px 12px;
		background: rgba(255, 215, 0, 0.1);
		border: 1px solid #ffd700;
		border-radius: 8px;
		min-width: 80px;
	}

	.points-label {
		font-size: 0.8em;
		color: #ffd700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-weight: 500;
	}

	.points-value {
		font-size: 1.4em;
		color: #ffd700;
		font-weight: 700;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 768px) {
		.word-card {
			flex-direction: column;
			align-items: stretch;
			gap: 16px;
		}

		.points-section {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			min-width: auto;
		}

		.word-main {
			justify-content: space-between;
		}

		.foreign-word {
			font-size: 1.3em;
		}
	}
</style>
