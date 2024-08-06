<script>
	import {
		selectedSubject,
		selectedMethod,
		learningMaterial,
		filters,
		words,
		user
	} from '../stores/index';
	import spanish from '../data/spanish.json';
	import greek from '../data/greek.json';
	const subjects = ['CSS', 'Greek', 'HTML', 'JavaScript', 'Korean', 'Spanish'];
	const header = 'How would you like to learn?';
	const methods = ['Flashcards', 'List of Words', 'Cards', 'Quiz', 'Pronunciations'];

	const handleClickSubject = (subjectClicked) => {
		const indexOf = subjects.indexOf(subjectClicked);
		if ($selectedSubject === subjectClicked || indexOf === -1) {
			$selectedSubject = null;
			$selectedMethod = null;
		} else {
			$selectedSubject = subjectClicked;
			$learningMaterial = {
				data: getLearningMaterial(subjectClicked)
			};
			$filters.level = 1;
			console.log($learningMaterial);
			fetchWords();
		}
	};

	const handleClickMethod = (methodClicked) => {
		if ($selectedMethod === methodClicked) {
			$selectedMethod = '';
		} else {
			$selectedMethod = methodClicked;
			if ($selectedMethod === 'Pronunciations') {
				$filters.level = 'pronunciations';
			} else {
				$filters.level = 1;
			}
		}
	};

	const fetchWords = async () => {
		const response = await fetch(
			`/api/words/${$selectedSubject.toLowerCase()}?level=${$filters.level}`,
			{
				headers: {
					Authorization: `Bearer ${$user.token}`
				}
			}
		);
		if (response.ok) {
			const data = await response.json();
			$words = data;
		} else {
			console.error('Failed to fetch words');
		}
		console.log('words', $words);
	};

	const getLearningMaterial = (subject) => {
		switch (subject) {
			// case 'CSS':
			// 	return css;
			case 'Greek':
				return greek;
			// case 'HTML':
			// 	return html;
			// case 'JavaScript':
			// 	return javascript;
			// case 'Korean':
			// 	return korean;
			case 'Spanish':
				return spanish;
			default:
				return [];
		}
	};
</script>

<section>
	<div class="subjects">
		<h2>{$selectedSubject ? $selectedSubject : 'Which subject would you like to learn?'}</h2>
		{#if $selectedSubject}
			<button on:click={(e) => handleClickSubject('')}>Change subject</button>
		{:else}
			{#each subjects as subject}
				<button on:click={(e) => handleClickSubject(subject)}>{subject}</button>
			{/each}
		{/if}
	</div>
	{#if $selectedSubject}
		<div class="selectedSubject">
			<h2>{header}</h2>
			<div class="subjectMethods">
				{#each methods as method}
					<button
						class={$selectedMethod === method ? 'selected' : ''}
						on:click={(e) => handleClickMethod(method)}>{method}</button
					>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	.subjects,
	.selectedSubject {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 10.42px;
		margin-bottom: 10.42px;
	}

	h2 {
		color: #ffd700;
	}

	.subjectMethods {
		display: flex;
		flex-wrap: wrap;
		gap: 10.42px;
		align-items: center;
	}

	.selected {
		background-color: #ffd700; /* Light Blue */
		color: #1a1a1a; /* Dark Black */
	}
</style>
