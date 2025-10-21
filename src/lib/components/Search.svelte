<script>
	import { query } from '$lib/api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { m } from '$lib/paraglide/messages.js';

	let { value } = $props();

	import SearchTag from './SearchTag.svelte';
	import TextOutlined from './TextOutlined.svelte';

	let filters = await query('filters');

	let fallbackFilters = $derived.by(() => {
		return Object.entries(filters)
			.map(([type, values]) => values.slice(0, 3).map((v) => ({ ...v, type })))
			.flat();
	});

	let filteredFilters = $derived.by(() => {
		if (!value) return null;

		return Object.entries(filters)
			.map(([type, values]) =>
				values
					.filter((filter) => new RegExp(value).test(filter.title ?? filter.value))
					.map((v) => ({ ...v, type }))
			)
			.flat()
			.slice(0, 20)
			.sort((a, b) => b.count - a.count);
	});

	let suggestedFilters = $derived(filteredFilters ?? fallbackFilters);

	function applyFilter(filter) {
		const url = new URL($page.url);

		const newParam = `${filter.id ?? filter.value}`;

		const currentParam = url.searchParams.get(filter.type);
		const filterSet = new Set(currentParam ? currentParam.split(',') : []);

		if (filterSet.has(newParam)) {
			filterSet.delete(newParam);
		} else {
			filterSet.add(newParam);
		}
		if (filterSet.size > 0) {
			url.searchParams.set(filter.type, Array.from(filterSet).join(','));
		} else {
			url.searchParams.delete(filter.type);
		}
		goto(url, { replaceState: true });
	}

	function submitSearch(e) {
		e.preventDefault();
		const url = new URL($page.url);
		if (value) {
			url.searchParams.set('search', value);
		} else {
			url.searchParams.delete('search');
		}
		goto(url, { replaceState: true });
	}
</script>

<section id="search" class="sticky top-7 z-2 mt-10 border-b bg-white">
	<div class="visible">
		<form onsubmit={submitSearch} class="flex">
			<input
				type="text"
				class="w-full border-transparent"
				bind:value
				placeholder={m.search_placeholder()}
			/>
			<button type="submit" class=" bg-blue-500 px-4 py-2 text-white"> 🔎 </button>
		</form>
	</div>
	<div class="m-4 hidden">
		<div class="flex flex-wrap gap-1 gap-y-1.5">
			{#each suggestedFilters as filter}
				<button onclick={() => applyFilter(filter)}>
					<SearchTag item={filter}></SearchTag>
				</button>
			{/each}
			<TextOutlined>more filters</TextOutlined>
		</div>
	</div>
</section>

<style>
	#search {
		&:focus-within {
			.hidden {
				display: block;
			}
		}

		.hidden {
			display: block;
		}
	}
</style>
