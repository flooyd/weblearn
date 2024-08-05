<script>
	import { selectedSubject, selectedMethod } from '../stores/index';
	const subjects = ['Ancient Greek', 'CSS', 'HTML', 'JavaScript', 'Korean', 'Spanish'];
	let englishHeader = null;
	let header = null;
	const english = [
		'How would you like to learn Ancient Greek?',
		'How would you like to learn CSS?',
		'How would you like to learn HTML?',
		'How would you like to learn JavaScript?',
		'How would you like to learn Korean?',
		'How would you like to learn Spanish?'
	];
	const headers = [
		'Πώς θα θέλατε να μάθετε αρχαία ελληνικά;',
		'color: #add8e6; /* Light Blue */',
		'<div class="lightblue">Hello, World!</div>',
		'console.log("Hello, World!")',
		'한국어를 어떻게 배우고 싶나요?',
		'¿Cómo te gustaría aprender español?'
	];
	const methods = ['Flashcards', 'List of Words'];

	const handleClickSubject = (subjectClicked) => {
		const indexOf = subjects.indexOf(subjectClicked);
		if ($selectedSubject === subjectClicked) {
			$selectedSubject = '';
			$selectedMethod = '';
		} else {
			$selectedSubject = subjectClicked;
		}
	};
	const handleClickMethod = (methodClicked) => {
		$selectedMethod = methodClicked;
	};

	$: $selectedSubject ? (header = headers[subjects.indexOf($selectedSubject)]) : (header = null);
	$: $selectedSubject
		? (englishHeader = english[subjects.indexOf($selectedSubject)])
		: (englishHeader = null);
</script>

<section>
	<div class="subjects">
		<h2>Which Subject would you like to learn?</h2>
		<div class="subjectButtons">
			{#each subjects as subject}
				<button
					class={$selectedSubject === subject ? 'selected' : ''}
					on:click={(e) => handleClickSubject(subject)}>{subject}</button
				>
			{/each}
		</div>
	</div>
	{#if $selectedSubject}
		<div class="selectedSubject">
			<h2>{header}</h2>
			<div class="subjectMethods">
				<h3>{englishHeader}</h3>
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
		margin-bottom: 21.6px;
	}

	.subjectMethods {
		display: flex;
		flex-wrap: wrap;
		gap: 10.42px;
		align-items: center;
	}

	.subjectButtons {
		display: flex;
		flex-wrap: wrap;
		gap: 5.96px;
	}

	.selected {
		background-color: #add8e6; /* Light Blue */
		color: #1a1a1a; /* Dark Black */
	}
</style>
