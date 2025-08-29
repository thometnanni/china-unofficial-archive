<script>
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { createEventDispatcher } from 'svelte';
	import { collators } from '$lib/collators.js';

	export let prop = '';
	export let label = '';
	export let options = [];
	export let selected = 'All';

	export let sortMode = 'stroke'; // 'pinyin' | 'stroke'

	const dispatch = createEventDispatcher();
	function handleChange(e) {
		dispatch('change', { prop, value: e.target.value });
	}

	const normalize = (s) => (s ?? '').normalize('NFKD').trim();

	$: locale = getLocale();

	function sortOptions(a, b) {
		if (locale === 'zh') {
			const A = normalize(a.label_zh || a.label_en || '');
			const B = normalize(b.label_zh || b.label_en || '');
			const primary = (sortMode === 'stroke' ? collators.zhStroke : collators.zhPinyin).compare(
				A,
				B
			);
			if (primary !== 0) return primary;
			const secondary = collators.zhStroke.compare(A, B);
			if (secondary !== 0) return secondary;
			return String(a.key).localeCompare(String(b.key));
		} else {
			const A = normalize(a.label_en || a.label_zh || '');
			const B = normalize(b.label_en || b.label_zh || '');
			return collators.en.compare(A, B);
		}
	}

	$: sortedOptions = (options ?? []).slice().sort(sortOptions);
</script>

<label>
	{label}:
	<select bind:value={selected} on:change={handleChange}>
		<option value="All">{m.all()}</option>
		{#each sortedOptions as option}
			<option value={option.key}>
				{locale === 'zh'
					? (option.label_zh ?? option.label_en)
					: (option.label_en ?? option.label_zh)}
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
