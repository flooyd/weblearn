<script>
	import { filters } from '../stores/index';

	const changeOperator = (operator) => {
		if ($filters.operator === operator) {
			$filters.operator = '';
		} else {
			$filters.operator = operator;
		}
		$filters = $filters;
	};

	const changeLevel = (level) => {
		$filters.level = level;
		$filters.operator = '';
		$filters.targetPoints = null;
		$filters = $filters;
	};

	const handleChangeTarget = (event) => {
		console.log(event.target);
		$filters.targetPoints = parseInt(event.target.value);
		$filters = $filters;
	};

	const changeSortOrder = (order) => {
		$filters.sortOrder = order;
		$filters = $filters;
	};
</script>

<div class="toolbar">
	<div class="section">
		<h2 class="section-label">Points</h2>
		<div class="button-group">
			<button on:click={() => changeOperator('lt')} class={$filters.operator === 'lt' ? 'active' : ''}>
				&lt;
			</button>
			<button on:click={() => changeOperator('gt')} class={$filters.operator === 'gt' ? 'active' : ''}>
				&gt;
			</button>
			<button on:click={() => changeOperator('equals')} class={$filters.operator === 'equals' ? 'active' : ''}>
				=
			</button>
		</div>
		<input 
			type="number" 
			on:input={handleChangeTarget} 
			bind:value={$filters.targetPoints} 
			placeholder="Value"
			class="points-input"
		/>
	</div>

	<div class="sort-section">
		<h2 class="section-label">Sort</h2>
		<div class="button-group">
			<button on:click={() => changeSortOrder('asc')} class={$filters.sortOrder === 'asc' ? 'active' : ''}>
				Asc
			</button>
			<button on:click={() => changeSortOrder('desc')} class={$filters.sortOrder === 'desc' ? 'active' : ''}>
				Desc
			</button>
		</div>
	</div>

	<div class="section">
		<h2 class="section-label">Level</h2>
		<div class="button-group">
			<button on:click={() => changeLevel(1)} class={$filters.level === 1 ? 'active' : ''}>1</button>
			<button on:click={() => changeLevel(2)} class={$filters.level === 2 ? 'active' : ''}>2</button>
			<button on:click={() => changeLevel(3)} class={$filters.level === 3 ? 'active' : ''}>3</button>
			<button on:click={() => changeLevel(4)} class={$filters.level === 4 ? 'active' : ''}>4</button>
			<button on:click={() => changeLevel(5)} class={$filters.level === 5 ? 'active' : ''}>5</button>
			<button on:click={() => changeLevel('all')} class={$filters.level === 'all' ? 'active' : ''}>
				All
			</button>
		</div>
	</div>
</div>

<style>
	.toolbar {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
		align-items: flex-start;
		background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
		padding: 20px 25px;
		border-top: 4px solid #ffd700;
		border-bottom: 4px solid #ffd700;
		margin-bottom: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	.section,
	.sort-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: flex-start;
	}

	.section-label {
		margin: 0;
		color: #ffd700;
		font-size: 1.1em;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 1px;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	.button-group {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	button {
		background: rgba(173, 216, 230, 0.1);
		border: 2px solid #add8e6;
		color: #e0e0e0;
		padding: 10px 16px;
		border-radius: 8px;
		font-size: 0.95em;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 45px;
		text-align: center;
	}

	button:hover {
		background: rgba(173, 216, 230, 0.2);
		border-color: #ffd700;
		color: #ffd700;
		transform: translateY(-1px);
		box-shadow: 0 2px 6px rgba(255, 215, 0, 0.2);
	}

	.active {
		background: #ffd700;
		border-color: #ffd700;
		color: #1a1a1a;
		font-weight: 600;
		box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
	}

	.active:hover {
		background: #ffed4e;
		transform: translateY(-1px);
		box-shadow: 0 3px 8px rgba(255, 215, 0, 0.4);
	}

	.points-input {
		background: rgba(173, 216, 230, 0.1);
		border: 2px solid #add8e6;
		color: #e0e0e0;
		padding: 10px 14px;
		border-radius: 8px;
		font-size: 0.95em;
		width: 120px;
		transition: all 0.3s ease;
	}

	.points-input:focus {
		outline: none;
		border-color: #ffd700;
		background: rgba(255, 215, 0, 0.1);
		box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
	}

	.points-input::placeholder {
		color: #999;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.toolbar {
			gap: 20px;
			padding: 16px 20px;
		}

		.section,
		.sort-section {
			gap: 10px;
		}

		.section-label {
			font-size: 1em;
		}

		button {
			padding: 8px 12px;
			font-size: 0.9em;
			min-width: 40px;
		}

		.points-input {
			width: 100px;
			padding: 8px 12px;
		}
	}

	@media (max-width: 480px) {
		.toolbar {
			flex-direction: column;
			gap: 16px;
			align-items: stretch;
		}

		.section,
		.sort-section {
			align-items: center;
		}

		.button-group {
			justify-content: center;
		}
	}
</style>
