<script>
	import { selectedSubject, selectedMethod } from '../stores/index';
	const subjects = ['Ancient Greek', 'CSS', 'HTML', 'JavaScript', 'Korean', 'Spanish'];
	const methods = ['Flashcards', 'List of Words'];
	const handleClick = (subjectClicked) => {
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
</script>

<section>
	<h2>Which Subject would you like to learn?</h2>
	<div class="subjects">
		{#each subjects as subject}
			<button
				class={$selectedSubject === subject ? 'selected' : ''}
				on:click={(e) => handleClick(subject)}>{subject}</button
			>
		{/each}
	</div>
	{#if $selectedSubject}
		<h2>How would you like to learn {$selectedSubject}?</h2>
		<div class="subjects">
			{#each methods as method}
				<button
					class={$selectedMethod === method ? 'selected' : ''}
					on:click={(e) => handleClickMethod(method)}>{method}</button
				>
			{/each}
		</div>
	{/if}
</section>

<style>
	.subjects {
		display: flex;
		gap: 10.42px;
		margin-bottom: 21.6px;
	}

	.selected {
		background-color: #add8e6; /* Light Blue */
		color: #1a1a1a; /* Dark Black */
	}
</style>
