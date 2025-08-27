<script>
	import PointButtons from './PointButtons.svelte';
	import { words } from '../stores/index.js';

	export let word;
	let front = true;
	console.log(front);
</script>

{#if front}
	<button class="flashcard front" on:click={() => (front = false)}>
		<div class="card-content">
			<h2 class="foreign-word">{word.word}</h2>
			<div class="points-badge">
				{$words.find((w) => w.word === word.word)?.points || 0}
			</div>
		</div>
		<div class="flip-hint">Click to reveal</div>
	</button>
{:else}
	<button class="flashcard back" on:click={() => (front = true)}>
		<div class="header">
			<div class="word-info">
				<h2 class="foreign-word">{word.word}</h2>
				<span class="pos-tag">{word.pos}</span>
			</div>
			<div class="points-badge">
				{$words.find((w) => w.word === word.word)?.points || 0}
			</div>
		</div>
		<p class="english-translation">{word.english}</p>
		<div class="actions">
			<PointButtons {word} />
		</div>
	</button>
{/if}

<style>
	.flashcard {
		display: flex;
		flex-direction: column;
		gap: 12px;
		border: 2px solid #add8e6;
		border-radius: 12px;
		padding: 20px;
		width: 300px;
		height: 200px;
		background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		position: relative;
		overflow: hidden;
	}

	.flashcard:hover {
		border-color: #ffd700;
		box-shadow: 0 6px 16px rgba(255, 215, 0, 0.3);
		transform: translateY(-2px);
	}

	.front {
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.back {
		justify-content: space-between;
	}

	.card-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		flex: 1;
		justify-content: center;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		gap: 12px;
	}

	.word-info {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
		min-width: 0;
	}

	.foreign-word {
		margin: 0;
		color: #ffd700;
		font-size: 1.8em;
		font-weight: 600;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		line-height: 1.2;
		word-break: break-word;
	}

	.front .foreign-word {
		font-size: 2.2em;
		text-align: center;
	}

	.pos-tag {
		background: #add8e6;
		color: #1a1a1a;
		padding: 4px 10px;
		border-radius: 12px;
		font-size: 0.75em;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		align-self: flex-start;
	}

	.english-translation {
		margin: 0;
		color: #e0e0e0;
		font-size: 1.1em;
		font-style: italic;
		line-height: 1.4;
		flex: 1;
		display: flex;
		align-items: center;
		text-align: left;
	}

	.points-badge {
		background: rgba(255, 215, 0, 0.15);
		border: 2px solid #ffd700;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffd700;
		font-weight: 700;
		font-size: 1.1em;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		flex-shrink: 0;
	}

	.flip-hint {
		position: absolute;
		bottom: 12px;
		left: 50%;
		transform: translateX(-50%);
		color: #999;
		font-size: 0.8em;
		font-style: italic;
		opacity: 0.7;
	}

	.actions {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: auto;
	}

	.flashcard:hover .flip-hint {
		opacity: 1;
		color: #ffd700;
	}

	@media (max-width: 768px) {
		.flashcard {
			width: 280px;
			height: 180px;
			padding: 16px;
		}

		.foreign-word {
			font-size: 1.5em;
		}

		.front .foreign-word {
			font-size: 1.8em;
		}

		.points-badge {
			width: 40px;
			height: 40px;
			font-size: 0.9em;
		}
	}
</style>
