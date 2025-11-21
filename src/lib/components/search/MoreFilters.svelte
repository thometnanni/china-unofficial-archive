<script>
	import { createEventDispatcher } from 'svelte';
	import { m } from '$lib/paraglide/messages';
	import SearchTag from './SearchTag.svelte';
let {
	expandedFilters = [],
	loading = false,
	hasScope = false,
	activeKeys = new Set(),
	showAllFilters = $bindable(false)
} = $props();
	const dispatch = createEventDispatcher();

	function toggle() {
		showAllFilters = !showAllFilters;
	}
	function apply(filter) {
		dispatch('applyFilter', filter);
	}
</script>

<div class="flex justify-end w-full">
	<button
		class="inline-flex items-center rounded-none border px-0.5 text-sm text-black transition-colors enabled:hover:bg-black enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
		type="button"
		on:click={toggle}
		aria-expanded={showAllFilters}
		disabled={loading}
		aria-disabled={loading}
	>
		<span>{showAllFilters ? m.hide_filters() : m.more_filters()}</span>
	</button>
</div>

{#if showAllFilters}
	<div class="mt-2 flex flex-col gap-3 border-t border-black pt-2">
		{#each expandedFilters as category}
			{#if category.filters.length}
			<div class="flex flex-col gap-1">
				<div class="text-gray-500">
					{category.label}
				</div>
				<div class="flex flex-wrap gap-2">
					{#each category.filters as filter}
						{@const count = hasScope
							? filter.availableCount ?? filter.scopedCount ?? 0
							: filter.baseCount ?? filter.count ?? 0}
						{@const isActive = activeKeys?.has?.(`${filter.type}:${filter.id ?? filter.value}`)}
						{@const isDisabled = loading || isActive || (hasScope && count === 0)}
						<SearchTag
							item={{
								...filter,
								availableCount: count
							}}
							class="filter-pill"
							disabled={isDisabled}
							on:click={() => apply(filter)}
						/>
					{/each}
				</div>
			</div>
			{/if}
		{/each}
	</div>
{/if}
