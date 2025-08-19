<script>
	import { m } from '$lib/paraglide/messages';

	export let prop = '';
	export let label = '';
	export let options = [];
	export let selected = 'All';

	import { getLocale } from '$lib/paraglide/runtime';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleChange(e) {
		dispatch('change', { prop, value: e.target.value });
	}
</script>

<label>
	{label}:
	<select bind:value={selected} on:change={handleChange}>
		<option value="All">{m.all()}</option>
		{#each options as option}
			<option value={option.key}>
				{getLocale() === 'zh' ? option.label_zh : option.label_en}
			</option>
		{/each}
	</select>
</label>

<style>
	select {
		padding: 0.4em;
		border-radius: 4px;
		border: 1px solid #ccc;
		font-size: 1em;
	}
	label {
		font-size: 0.95em;
	}
</style>
