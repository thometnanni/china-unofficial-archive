<script>
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import { m } from '$lib/paraglide/messages.js';
	let { value, itemFilters, baseFilters } = $props();
	import SearchTag from './SearchTag.svelte';
	import MoreFilters from './MoreFilters.svelte';

	let searchInput;
	let pending = $state(false);
	let navStart = $state(0);
	let hideTimer;
	let showAllFilters = $state(false);

	const hasFilterParams = $derived.by(() =>
		baseFilters ? Object.keys(baseFilters).some((type) => $page.url.searchParams.has(type)) : false
	);
	const hasSearchParam = $derived.by(() => !!$page.url.searchParams.get('search'));
	const hasScope = $derived.by(() => hasFilterParams || hasSearchParam);

	const getFilterKey = (filter) => `${filter.type}:${filter.id ?? filter.value}`;
	const withCounts = (filter, type) => {
		const key = filter.id ?? filter.value;
		const scoped = hasScope ? itemFilters?.[type]?.[key] : undefined;
		const count =
			hasScope && itemFilters != null ? scoped ?? 0 : filter.count ?? 0;
		return { ...filter, type, availableCount: count, count };
	};
	let activeFilters = $derived.by(() => {
		const picked = [];
		const seen = new Set();
		Object.entries(baseFilters ?? {}).forEach(([type]) => {
			const searchParam = $page.url.searchParams.get(type);
			if (searchParam == null) return;
			decodeURIComponent(searchParam)
				.split(',')
				.forEach((value) => {
					const filter = (baseFilters?.[type] ?? []).find(
						(f) => f.id == value || f.value == value
					);
					if (!filter) return;
					const enriched = withCounts(filter, type);
					const key = getFilterKey(enriched);
					if (seen.has(key)) return;
					seen.add(key);
					picked.push(enriched);
				});
		});
		return picked;
	});
	let activeFilterKeys = $derived.by(
		() => new Set(activeFilters.map((filter) => getFilterKey(filter)))
	);
	let fallbackFilters = $derived.by(() => {
		return Object.entries(baseFilters ?? {})
			.map(([type, values]) =>
				values
					.filter((filter) => {
						if (itemFilters == null) return true;
						return itemFilters[type]?.[filter.id ?? filter.value] != null;
					})
					.map((v) => withCounts(v, type))
					.filter((filter) => !activeFilterKeys.has(getFilterKey(filter)))
			)
			.flat();
	});
	let filteredFilters = $derived.by(() => {
		if (!value) return null;
		return Object.entries(baseFilters ?? {})
			.map(([type, values]) =>
				values
					.filter((filter) => {
						return (
							(itemFilters == null || itemFilters[type]?.[filter.id ?? filter.value] != null) &&
							new RegExp(value, 'i').test(filter.title ?? filter.value)
						);
					})
					.map((v) => withCounts(v, type))
					.filter((filter) => !activeFilterKeys.has(getFilterKey(filter)))
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
			(baseFilters?.[t] ?? [])
				.filter((f) => itemFilters == null || itemFilters[t]?.[f.id ?? f.value] != null)
				.sort((a, b) => b.count - a.count)
				.slice(0, 3)
				.map((v) => withCounts(v, t));
		return [...pick('creator'), ...pick('year')];
	});

	const categoryOrder = ['objectType', 'theme', 'era', 'year', 'creator'];
	const categoryLabels = {
		objectType: () => m.type(),
		theme: () => m.theme(),
		era: () => m.era(),
		year: () => 'Year',
		creator: () => 'Creator'
	};
	let expandedFilters = $derived.by(() => {
		if (!baseFilters) return [];
		const groups = Object.entries(baseFilters).map(([type, values]) => ({
			type,
			label: categoryLabels[type]?.() ?? type,
			filters: values
				.map((v) => withCounts(v, type))
				.filter((f) => !(hasScope && f.availableCount === 0))
		}));
		return categoryOrder
			.map((type) => groups.find((g) => g.type === type))
			.filter(Boolean)
			.concat(groups.filter((g) => !categoryOrder.includes(g.type)));
	});

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
	class="sticky top-0 z-2 border-b bg-white {loading && 'isLoading'}"
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
			{#each suggestedFilters as filter (filter.id ?? filter.value ?? filter.title ?? filter.type)}
				<button onclick={() => applyFilter(filter)} disabled={loading} aria-disabled={loading}>
					<SearchTag item={filter}></SearchTag>
				</button>
			{/each}
			<MoreFilters
				bind:showAllFilters
				{expandedFilters}
				{loading}
				hasScope={hasScope}
				on:applyFilter={(e) => applyFilter(e.detail)}
			/>
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
