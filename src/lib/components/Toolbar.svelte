<script>
	import { selectedSubject, selectedMethod } from '../stores/index';
</script>

<div class="toolbar">
	<div class="section">
		<div>Points</div>
		<button>&lt;</button>
		<button>&gt;</button>
		<button>=</button>
		<input type="number" />
	</div>
</div>

<style>
	.toolbar {
		display: flex;
		justify-content: space-between;
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
