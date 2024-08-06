<script>
	import { user, selectedSubject, level, words } from '../stores/index.js';

	export let word;

	const handleClickPoints = async (points) => {
		points = findWord(word).points + points;
		if (points < 0) {
			points = 0;
		} else if (points > 100) {
			points = 100;
		}
		const updateUrl = `/api/words/${$selectedSubject.toLowerCase()}/${word.word}`;
		const response = await fetch(updateUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$user.token}`
			},
			body: JSON.stringify({ points, level: $level })
		});

		if (response.ok) {
			const data = await response.json();
			word.points = data.points;
			updateWord(word);
		} else {
			console.error('Failed to update points');
		}
	};

	const findWord = (word) => {
		return $words.find((w) => w.word === word.word);
	};

	const updateWord = (word) => {
		const index = $words.findIndex((w) => w.word === word.word);
		$words[index] = word;
	};
</script>

<div class="card">
	<div class="header">
		<h2>{word.word}</h2>
		<h2>{$words.find((w) => w.word === word.word)?.points || ''}</h2>
	</div>
	<p>{word.english}</p>
	<p class="italic">{word.pos}</p>
	<div class="buttons">
		<button on:click={() => handleClickPoints(-10)}>-10</button>
		<button on:click={() => handleClickPoints(-5)}>-5</button>
		<button on:click={() => handleClickPoints(-1)}>-1</button>
		<button on:click={() => handleClickPoints(1)}>+1</button>
		<button on:click={() => handleClickPoints(5)}>+5</button>
		<button on:click={() => handleClickPoints(10)}>+10</button>
	</div>
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
		min-width: 200px;
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

	button {
		width: fit-content;
	}

	.buttons {
		display: flex;
		gap: 5.96px;
	}
</style>
