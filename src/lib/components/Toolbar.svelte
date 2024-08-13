<script>
	import { selectedSubject, selectedMethod } from '../stores/index';
</script>

<div class="toolbar">
	<div class="section">
		<h2>P.</h2>
		<button>&lt;</button>
		<button>&gt;</button>
		<button>=</button>
		<input type="number" />
	</div>
	<div class="section">
		<h2>L.</h2>
		<button>1</button>
		<button>2</button>
		<button>3</button>
		<button>4</button>
		<button>5</button>
		<button>All</button>
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
</style>
