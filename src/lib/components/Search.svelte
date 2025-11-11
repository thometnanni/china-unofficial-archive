<script>
	import { query } from '$lib/api';
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import { m } from '$lib/paraglide/messages.js';
	let { value, itemFilters } = $props();
	import SearchTag from './SearchTag.svelte';
	import TextOutlined from './TextOutlined.svelte';
	let filters = await query('filters');
	let searchInput;
	let pending = $state(false);
	let navStart = $state(0);
	let hideTimer;
	let fallbackFilters = $derived.by(() => {
		return Object.entries(filters)
			.map(([type, values]) =>
				values
					.filter((filter) => {
						if (itemFilters == null) return true;
						return itemFilters[type][filter.id ?? filter.value] != null;
					})
					// .slice(0, 3)
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
			.slice(0, 10)
			.sort((a, b) => b.count - a.count);
	});

	const maxOthers = 3;

	let suggestedFilters = $derived.by(() => {
		const source = filteredFilters ?? fallbackFilters ?? [];
		const base = source.filter((f) => !['creator', 'year'].includes(f.type));
		const sortFn = (a, b) => {
			if (a.type === 'objectType' && b.type !== 'objectType') return -1;
			if (b.type === 'objectType' && a.type !== 'objectType') return 1;
			return b.count - a.count;
		};
		if (filteredFilters) return base.sort(sortFn);

		const allObjectType = base.filter((f) => f.type === 'objectType');
		const others = base
			.filter((f) => f.type !== 'objectType')
			.reduce((acc, f) => {
				if (!acc[f.type]) acc[f.type] = [];
				if (acc[f.type].length < maxOthers) acc[f.type].push(f);
				return acc;
			}, {});
		const limitedOthers = Object.values(others).flat();
		return [...allObjectType, ...limitedOthers].sort(sortFn);
	});

	let othersLimited = $derived.by(() => {
		if (filteredFilters) return [];
		const pick = (t) =>
			(filters[t] ?? [])
				.filter((f) => itemFilters == null || itemFilters[t][f.id ?? f.value] != null)
				.sort((a, b) => b.count - a.count)
				.slice(0, 3)
				.map((v) => ({ ...v, type: t }));
		return [...pick('creator'), ...pick('year')];
	});

	// $effect(() => {
	// 	console.log('suggestedFilters', suggestedFilters);
	// });

	let showLoader = $derived($navigating != null || pending);
	$effect(() => {
		if ($navigating == null && pending) {
			const elapsed = Date.now() - navStart;
			const remain = Math.max(250 - elapsed, 0);
			clearTimeout(hideTimer);
			hideTimer = setTimeout(() => (pending = false), remain);
		}
	});
	function startNav() {
		clearTimeout(hideTimer);
		navStart = Date.now();
		pending = true;
	}
	function applyFilter(filter) {
		startNav();
		const url = new URL($page.url);
		const newParam = `${filter.id ?? filter.value}`;
		const currentParam = url.searchParams.get(filter.type);
		const filterSet = new Set(currentParam ? currentParam.split(',') : []);
		if (filterSet.has(newParam)) filterSet.delete(newParam);
		else filterSet.add(newParam);
		if (filterSet.size > 0) url.searchParams.set(filter.type, Array.from(filterSet).join(','));
		else url.searchParams.delete(filter.type);
		goto(url, { replaceState: true });
		setTimeout(() => {
			searchInput?.focus();
		}, 0);
	}
	function submitSearch(e) {
		e.preventDefault();
		startNav();
		const url = new URL($page.url);
		if (value) url.searchParams.set('search', value);
		else url.searchParams.delete('search');
		goto(url, { replaceState: true });
	}
	function resetSearch() {
		startNav();
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
	let loading = $derived(showLoader);
</script>

<section
	id="search"
	class="sticky top-0 z-2  border-b bg-white {loading && 'isLoading'}"
	aria-busy={$navigating != null}
>
	{#if showLoader}
		<div class="progressLine w-full"></div>
	{/if}
	<div class="searchBox visible relative m-1 flex flex-wrap gap-1">
		{#each activeFilters as filter}
			<button
				class="mx-1"
				onclick={() => applyFilter(filter)}
				disabled={loading}
				aria-disabled={loading}
			>
				<SearchTag item={filter} close></SearchTag>
			</button>
		{/each}
		{#if activeSearch}
			<button onclick={resetSearch} disabled={loading} aria-disabled={loading}>
				<SearchTag item={{ title: activeSearch, type: 'search' }} close></SearchTag>
			</button>
		{/if}
		<form onsubmit={submitSearch} class="flex flex-1">
			<button type="submit" class="hover:text-black" disabled={loading} aria-disabled={loading}>
				<svg
					id="icon"
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 32 32"
				>
					<defs
						><style>
							.cls-1 {
								fill: none;
							}
						</style></defs
					>
					<path
						d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"
					/>
					<rect class="cls-1" width="32" height="32" />
				</svg>
			</button>
			<input
				bind:this={searchInput}
				type="text"
				class="w-full border-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none"
				bind:value
				placeholder={m.search_placeholder()}
			/>
		</form>
	</div>
	<div class="m-2">
		<div class="flex flex-wrap gap-1 gap-y-1.5">
			{#each suggestedFilters as filter}
				<button onclick={() => applyFilter(filter)} disabled={loading} aria-disabled={loading}>
					<SearchTag item={filter}></SearchTag>
				</button>
			{/each}
			<TextOutlined>more filters</TextOutlined>
		</div>
	</div>
</section>

<style>
	#search {
		position: relative;
		overflow: hidden;
	}
	.progressLine {
		position: absolute;
		left: 0;
		top: 0;
		height: 2px;
		width: 100%;
		background: currentColor;
		transform-origin: left;
		animation: progress 1.1s ease-in-out infinite;
		z-index: 20;
		opacity: 0.9;
	}
	@keyframes progress {
		0% {
			transform: scaleX(0);
		}

		20% {
			transform: scaleX(1);
		}
	}
	button[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
