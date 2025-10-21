<script>
	import { query } from '$lib/api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { m } from '$lib/paraglide/messages.js';

	let { value } = $props();

	import SearchTag from './SearchTag.svelte';
	import TextOutlined from './TextOutlined.svelte';

	let filters = await query('filters');

	let suggestedFilters = $derived.by(() => {
		return Object.entries(filters)
			.map(([type, values]) => values.slice(0, 3).map((v) => ({ ...v, type })))
			.flat();
	});

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
		console.log(filterSet);
		if (filterSet.size > 0) {
			url.searchParams.set(filter.type, Array.from(filterSet).join(','));
		} else {
			url.searchParams.delete(filter.type);
		}
		goto(url, { replaceState: true });
	}

	$effect(() => console.log(suggestedFilters));
</script>

<section id="search" class="sticky top-7 z-2 mt-10 border-b bg-white">
	<div class="visible">
		<input
			type="text"
			class="w-full border-transparent"
			bind:value
			placeholder={m.search_placeholder()}
		/>
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
		/* 
		.hidden {
			display: block;
		} */
	}
</style>
