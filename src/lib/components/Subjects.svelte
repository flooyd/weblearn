<script>
	import {
		selectedSubject,
		selectedMethod,
		learningMaterial,
		filters,
		words,
		user,
		filteredWords
	} from '../stores/index';
	import spanish from '../data/spanish.json';
	import greek from '../data/greek.json';
	
	const css = {
		"1": [{"word": "color", "pos": "property", "english": "sets the text color"}],
		"2": [{"word": "margin", "pos": "property", "english": "sets the outer spacing"}],
		"3": [{"word": "flexbox", "pos": "layout", "english": "flexible box layout model"}],
		"4": [{"word": "grid", "pos": "layout", "english": "two-dimensional layout system"}],
		"5": [{"word": "transform", "pos": "property", "english": "applies transformations to elements"}]
	};
	
	const html = {
		"1": [{"word": "div", "pos": "element", "english": "division container element"}],
		"2": [{"word": "span", "pos": "element", "english": "inline container element"}],
		"3": [{"word": "section", "pos": "element", "english": "semantic content section"}],
		"4": [{"word": "article", "pos": "element", "english": "standalone content piece"}],
		"5": [{"word": "aside", "pos": "element", "english": "sidebar or tangential content"}]
	};
	
	const javascript = {
		"1": [{"word": "function", "pos": "keyword", "english": "defines a reusable block of code"}],
		"2": [{"word": "array", "pos": "data type", "english": "ordered list of values"}],
		"3": [{"word": "object", "pos": "data type", "english": "collection of key-value pairs"}],
		"4": [{"word": "promise", "pos": "concept", "english": "represents eventual completion of async operation"}],
		"5": [{"word": "closure", "pos": "concept", "english": "function with access to outer scope variables"}]
	};
	
	const korean = {
		"1": [{"word": "안녕", "pos": "greeting", "english": "hello"}],
		"2": [{"word": "감사", "pos": "expression", "english": "thank you"}],
		"3": [{"word": "사랑", "pos": "noun", "english": "love"}],
		"4": [{"word": "행복", "pos": "noun", "english": "happiness"}],
		"5": [{"word": "미안", "pos": "expression", "english": "sorry"}]
	};
	
	const subjects = ['CSS', 'Greek', 'HTML', 'JavaScript', 'Korean', 'Spanish'];
	const header = 'How would you like to learn?';
	const methods = ['Flashcards', 'List of Words', 'Quiz', 'Pronunciations'];

	const handleClickSubject = async (subjectClicked) => {
		const indexOf = subjects.indexOf(subjectClicked);
		if ($selectedSubject === subjectClicked || indexOf === -1) {
			$selectedSubject = null;
			$selectedMethod = null;
			$learningMaterial = null;
		} else {
			$selectedSubject = subjectClicked;
			$learningMaterial = {
				data: getLearningMaterial(subjectClicked)
			};
			$filters.level = 1;
			await fetchWords();
			getFilteredWords();
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

	const getFilteredWords = () => {
		console.log('GET FILTERED WORDS');
		let filtered = [];
		const learningMaterialWords = $learningMaterial.data[$filters.level];
		if ($filters.operator) {
			filtered = learningMaterialWords.filter((word) => {
				if ($filters.operator === 'lt') {
					if ($words.find((w) => w.points < $filters.targetPoints && w.word === word.word)) {
						return true;
					}
				} else if ($filters.operator === 'gt') {
					if ($words.find((w) => w.points > $filters.targetPoints && w.word === word.word)) {
						return true;
					}
				} else if ($filters.operator === 'equals') {
					if ($words.find((w) => w.points === $filters.targetPoints && w.word === word.word)) {
						return true;
					}
				}
			});
		} else {
			filtered = learningMaterialWords;
		}

		//order filter by points
		filtered.sort((a, b) => {
			const aPoints = $words.find((w) => w.word === a.word)?.points || 0;
			const bPoints = $words.find((w) => w.word === b.word)?.points || 0;
			if ($filters.sortOrder === 'desc') {
				return bPoints - aPoints;
			} else {
				return aPoints - bPoints;
			}
		});

		$filteredWords = filtered;
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
	};

	const getLearningMaterial = (subject) => {
		switch (subject) {
			case 'CSS':
				return css;
			case 'Greek':
				return greek;
			case 'HTML':
				return html;
			case 'JavaScript':
				return javascript;
			case 'Korean':
				return korean;
			case 'Spanish':
				return spanish;
			default:
				return [];
		}
	};

	$: $filters && $selectedMethod ? getFilteredWords() : null;
</script>

<section class="subjectsContainer">
	<div class="subjects">
		<h1 class="main-heading">{$selectedSubject ? $selectedSubject : 'Which subject would you like to learn?'}</h1>
		{#if $selectedSubject}
			<button class="change-subject-btn" on:click={(e) => handleClickSubject('')}>
				Change subject
			</button>
		{:else}
			<div class="subject-grid">
				{#each subjects as subject}
					<button class="subject-btn" on:click={(e) => handleClickSubject(subject)}>
						{subject}
					</button>
				{/each}
			</div>
		{/if}
	</div>
	{#if $selectedSubject}
		<div class="selectedSubject">
			<h2 class="method-heading">{header}</h2>
			<div class="subjectMethods">
				{#each methods as method}
					<button
						class="method-btn {$selectedMethod === method ? 'selected' : ''}"
						on:click={(e) => handleClickMethod(method)}
					>
						{method}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	.subjectsContainer {
		padding: 25px 0;
	}

	.subjects,
	.selectedSubject {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 25px;
		padding: 25px;
		background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
		border-radius: 12px;
		border: 2px solid #add8e6;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.main-heading {
		color: #ffd700;
		font-size: 1.8em;
		font-weight: 700;
		margin: 0;
		text-align: center;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		letter-spacing: 0.5px;
	}

	.method-heading {
		color: #ffd700;
		font-size: 1.4em;
		font-weight: 600;
		margin: 0;
		text-align: center;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		letter-spacing: 0.5px;
	}

	.subject-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 15px;
		width: 100%;
	}

	.subject-btn,
	.method-btn,
	.change-subject-btn {
		background: rgba(173, 216, 230, 0.1);
		border: 2px solid #add8e6;
		color: #e0e0e0;
		padding: 16px 24px;
		border-radius: 10px;
		font-size: 1.1em;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: center;
		letter-spacing: 0.5px;
	}

	.subject-btn:hover,
	.method-btn:hover,
	.change-subject-btn:hover {
		background: rgba(173, 216, 230, 0.2);
		border-color: #ffd700;
		color: #ffd700;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
	}

	.change-subject-btn {
		align-self: center;
		background: rgba(255, 215, 0, 0.1);
		border-color: #ffd700;
		color: #ffd700;
		font-weight: 600;
	}

	.change-subject-btn:hover {
		background: rgba(255, 215, 0, 0.2);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
	}

	.subjectMethods {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 15px;
		width: 100%;
	}

	.selected {
		background: #ffd700;
		border-color: #ffd700;
		color: #1a1a1a;
		font-weight: 600;
		box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
	}

	.selected:hover {
		background: #ffed4e;
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(255, 215, 0, 0.4);
	}

	@media (max-width: 768px) {
		.subjectsContainer {
			padding: 20px 0;
		}

		.subjects,
		.selectedSubject {
			padding: 20px;
			gap: 16px;
			margin-bottom: 20px;
		}

		.main-heading {
			font-size: 1.5em;
		}

		.method-heading {
			font-size: 1.2em;
		}

		.subject-grid,
		.subjectMethods {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
			gap: 12px;
		}

		.subject-btn,
		.method-btn,
		.change-subject-btn {
			padding: 14px 20px;
			font-size: 1em;
		}
	}

	@media (max-width: 480px) {
		.subject-grid,
		.subjectMethods {
			grid-template-columns: 1fr 1fr;
			gap: 10px;
		}

		.subject-btn,
		.method-btn,
		.change-subject-btn {
			padding: 12px 16px;
			font-size: 0.95em;
		}

		.main-heading {
			font-size: 1.3em;
		}

		.method-heading {
			font-size: 1.1em;
		}
	}
</style>
