<script>
	import { query } from '$lib/api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { m } from '$lib/paraglide/messages.js';

	let { value, itemFilters } = $props();

	import SearchTag from './SearchTag.svelte';
	import TextOutlined from './TextOutlined.svelte';

	let filters = await query('filters');

	let searchInput;

	let fallbackFilters = $derived.by(() => {
		return Object.entries(filters)
			.map(([type, values]) =>
				values
					.filter((filter) => {
						if (itemFilters == null) return true;
						return itemFilters[type][filter.id ?? filter.value] != null;
					})
					.slice(0, 3)
					.map((v) => ({ ...v, type }))
			)
			.flat();
	});

	let filteredFilters = $derived.by(() => {
		if (!value) return null;

		return Object.entries(filters)
			.map(([type, values]) =>
				values
					.filter((filter) => {
						return (
							(itemFilters == null || itemFilters[type][filter.id ?? filter.value] != null) &&
							new RegExp(value, 'i').test(filter.title ?? filter.value)
						);
					})
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

		setTimeout(() => {
			searchInput?.focus();
		}, 0);
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

	function resetSearch() {
		const url = new URL($page.url);
		url.searchParams.delete('search');
		goto(url, { replaceState: true });
	}

	let activeFilters = $derived.by(() => {
		const activeFilters = Object.entries(filters)
			.map(([type, typedFilters]) => {
				const searchParam = $page.url.searchParams.get(type);
				if (searchParam == null) return [];
				const active = decodeURIComponent(searchParam)
					.split(',')
					.map((value) => {
						const filter = filters[type].find((f) => f.id == value || f.value == value);
						if (filter == null) return [];
						return { ...filter, type };
					});

				return active;
			})
			.flat();
		// console.log($page.url.search, JSON.stringify(activeFilters, null, 2));
		return activeFilters;
	});

	let activeSearch = $derived.by(() => {
		const searchParam = $page.url.searchParams.get('search');
		if (searchParam == null) return;
		const active = decodeURIComponent(searchParam);
		return active;
	});
</script>

<section id="search" class="sticky top-0 z-2 border-b border-t bg-white">
	<div class="search-box visible m-1 flex gap-1">
		{#each activeFilters as filter}
			<button class="mx-1" onclick={() => applyFilter(filter)}>
				<SearchTag item={filter} close></SearchTag>
			</button>
		{/each}
		{#if activeSearch}
			<button onclick={resetSearch}>
				<SearchTag item={{ title: activeSearch, type: 'search' }} close></SearchTag>
			</button>
		{/if}
		<form onsubmit={submitSearch} class="flex flex-1">
			<button type="submit" class=" hover:text-black">
				<svg
					id="icon"
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 32 32"
				>
					<defs>
						<style>
							.cls-1 {
								fill: none;
							}
						</style>
					</defs>
					<path
						d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"
						transform="translate(0 0)"
					/>
					<rect
						id="_Transparent_Rectangle_"
						data-name="&lt;Transparent Rectangle&gt;"
						class="cls-1"
						width="32"
						height="32"
					/>
				</svg>
			</button>
			<input
				bind:this={searchInput}
				type="text"
				class="w-full border-transparent"
				bind:value
				placeholder={m.search_placeholder()}
			/>
		</form>
	</div>
	<div class="m-2">
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
		.search-box {
			&:focus-within {
				/* outline: 1px solid black; */

				input {
					outline: none;
					box-shadow: none;
				}
			}
		}
		&:focus-within {
			.hidden {
				display: block;
			}
		}

		.hidden {
			/* display: block; */
		}
	}
</style>
