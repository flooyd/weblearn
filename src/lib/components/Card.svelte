<script>
	export let word;
</script>

<div class="card">
	<h2>{word.word}</h2>
	<p>{word.english}</p>
	<p class="italic">{word.pos}</p>
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
	}

	h2 {
		margin: 0px;
	}

	p {
		margin: 0px;
		width: fit-content;
	}
</style>
