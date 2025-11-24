<script>
	import { createEventDispatcher } from 'svelte';
	import SearchTag from './SearchTag.svelte';
	let {
		expandedFilters = [],
		loading = false,
		hasScope = false,
		activeKeys = new Set(),
		showAllFilters = false
	} = $props();
	const dispatch = createEventDispatcher();

	function apply(filter) {
		dispatch('applyFilter', filter);
	}
</script>

{#if showAllFilters}
	<div class="flex flex-col gap-3 pt-2">
		{#each expandedFilters as category}
			{#if category.filters.length}
				<div class="flex flex-col gap-1">
					<div class="text-gray-500">
						{category.label}
					</div>
					<div class="flex flex-wrap gap-2">
						{#each category.filters as filter}
							{@const count = hasScope
								? (filter.availableCount ?? filter.scopedCount ?? 0)
								: (filter.baseCount ?? filter.count ?? 0)}
							{@const isActive = activeKeys?.has?.(`${filter.type}:${filter.id ?? filter.value}`)}
							{@const isDisabled = loading || isActive || (hasScope && count === 0)}
							<SearchTag
								item={{
									...filter,
									availableCount: count
								}}
								class="filter-pill"
								disabled={isDisabled}
								onclick={() => apply(filter)}
							/>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}
