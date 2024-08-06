<script>
	import { user, selectedSubject, level, words } from '../stores/index.js';

	export let word;

	const handleClickPoints = async (points) => {
		if (findWord(word) && points !== 0) {
			points = findWord(word).points + points;
		}

		if (points === 0) {
			points = 0;
		} else if (points < 0) {
			points = 0;
		} else if (points > 100) {
			points = 100;
		}

		console.log('Final points before update:', points);

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
			updateWords(word);
		} else {
			console.error('Failed to update points');
		}
	};

	const findWord = (word) => {
		return $words.find((w) => w.word === word.word);
	};

	const updateWords = (word) => {
		//if word is not in words, add it
		if (!findWord(word)) {
			$words = [...$words, word];
		} else {
			const index = $words.findIndex((w) => w.word === word.word);
			$words[index] = word;
		}
	};
</script>

<div class="buttons">
	<button on:click={() => handleClickPoints(0)}>0</button>
	<button on:click={() => handleClickPoints(-10)}>-10</button>
	<button on:click={() => handleClickPoints(-5)}>-5</button>
	<button on:click={() => handleClickPoints(5)}>+5</button>
	<button on:click={() => handleClickPoints(10)}>+10</button>
	<button on:click={() => handleClickPoints(100)}>100</button>
</div>

<style>
	button {
		width: fit-content;
	}

	.buttons {
		display: flex;
		gap: 5.96px;
	}
</style>
