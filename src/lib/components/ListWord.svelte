<script>
	export let word;
</script>

<div class="word">
	<h2>{word.word}</h2>
	<p>{word.english}</p>
	<p>{word.pos}</p>
</div>

<style>
	.word {
		display: flex;
		justify-content: space-between;
		gap: 10.42px;
		border-bottom: 1px solid #add8e6;
		max-width: 500px;
		align-items: center;
		margin-bottom: 5.96px;
	}

	h2 {
		margin: 0px;
		width: 50%;
	}

	p {
		margin: 0px;
		width: 33%;
	}
</style>
