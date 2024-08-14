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
</script>

<div class="toolbar">
	<div class="section">
		<h2>P.</h2>
		<button on:click={() => changeOperator('lt')} class={$filters.operator === 'lt' ? 'active' : ''}
			>&lt;</button
		>
		<button on:click={() => changeOperator('gt')} class={$filters.operator === 'gt' ? 'active' : ''}
			>&gt;</button
		>
		<button
			on:click={() => changeOperator('equals')}
			class={$filters.operator === 'equals' ? 'active' : ''}>=</button
		>
		<input type="number" on:input={handleChangeTarget} bind:value={$filters.targetPoints} />
	</div>
	<div class="section">
		<h2>L.</h2>
		<button on:click={() => changeLevel(1)} class={$filters.level === 1 ? 'active' : ''}>1</button>
		<button on:click={() => changeLevel(2)} class={$filters.level === 2 ? 'active' : ''}>2</button>
		<button on:click={() => changeLevel(3)} class={$filters.level === 3 ? 'active' : ''}>3</button>
		<button on:click={() => changeLevel(4)} class={$filters.level === 4 ? 'active' : ''}>4</button>
		<button on:click={() => changeLevel(5)} class={$filters.level === 5 ? 'active' : ''}>5</button>
		<button on:click={() => changeLevel('all')} class={$filters.level === 'all' ? 'active' : ''}
			>All</button
		>
	</div>
</div>

<style>
	.toolbar {
		display: flex;
		gap: 10.42px;
		flex-wrap: wrap;
		align-items: center;
		background-color: #1a1a1a;
		padding: 5.96px 0px;
		border-top: 3px solid #ffd700;
		margin-bottom: 10.42px;
		border-bottom: 3px solid #ffd700;
	}

	.section {
		display: flex;
		gap: 5.96px;
		align-items: center;
	}

	.active {
		background-color: #ffd700;
	}
</style>
