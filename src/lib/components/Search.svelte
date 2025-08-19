<script>
	export let value = '';
	import { m } from '$lib/paraglide/messages.js';
</script>

<input type="text" class="search-input" bind:value placeholder={m.search_placeholder()} />

<style>
	.search-input {
		margin-bottom: 1.2em;
		padding: 0.5em;
		font-size: 1em;
		width: 100%;
		max-width: 400px;
		box-sizing: border-box;
		border-radius: 6px;
		border: 1px solid #ddd;
	}
</style>
