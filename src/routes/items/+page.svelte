<script>
	import { onMount } from 'svelte';
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import {
		fetchItemsQuery,
		getResourcesByTemplate,
		fetchAllItemsForProperty,
		buildItemsUrl
	} from '$lib/api.js';
	import Card from '$lib/components/Card.svelte';
	import Search from '$lib/components/Search.svelte';
	import Filters from '$lib/components/Filters.svelte';
	import Zoom from '$lib/components/wrappers/zoom.svelte';

	let filterConfigs = [
		{ prop: 'dcterms:type', labelKey: 'type', isResource: true, templateId: 9 },
		{
			prop: 'dcterms:subject',
			labelKey: 'theme',
			isResource: true,
			templateId: 10
		},
		{
			prop: 'dcterms:creator',
			labelKey: 'creator',
			isResource: true,
			templateId: 3
		}
	];

	let selectedFilters = {};
	let filterOptions = {};
	let items = [];
	let loading = true;
	let page = 1;
	let perPage = 40;
	let search = '';
	let ready = false;

	filterConfigs.forEach((f) => {
		selectedFilters[f.prop] = 'All';
		filterOptions[f.prop] = [];
	});

	onMount(async () => {
		for (const f of filterConfigs) {
			if (f.isResource) {
				const resources = await getResourcesByTemplate(f.templateId);
				filterOptions[f.prop] = resources.map((r) => {
					const id = r['o:id'].toString();
					const titles = r['dcterms:title'] || [];
					const label_en =
						titles.find((ti) => ti['@language'] === 'en')?.['@value'] ||
						titles[0]?.['@value'] ||
						r['o:title'] ||
						r['display_title'] ||
						id;
					const label_zh = titles.find((ti) => ti['@language'] === 'zh')?.['@value'] || label_en;
					return { key: id, label_en, label_zh };
				});
			} else {
				const allItems = await fetchAllItemsForProperty(f.prop);
				const values = new Set();
				for (const item of allItems) {
					(item[f.prop] || []).forEach((val) => {
						if (val.type === 'literal' && val['@value']) values.add(val['@value']);
					});
				}
				filterOptions[f.prop] = Array.from(values)
					.sort()
					.map((v) => ({
						key: v,
						label_en: v,
						label_zh: v
					}));
			}
		}
		filterOptions = { ...filterOptions };
		ready = true;
	});

	function handleFilterChange(e) {
		selectedFilters = { ...selectedFilters, [e.detail.prop]: e.detail.value };
		page = 1;
	}

	function nextPage() {
		page += 1;
	}
	function prevPage() {
		page = Math.max(1, page - 1);
	}

	function getActiveFilters() {
		return filterConfigs
			.map((f) => {
				const value = selectedFilters[f.prop];
				if (!value || value === 'All') return null;
				return { prop: f.prop, value };
			})
			.filter(Boolean);
	}

	$: loadTrigger = JSON.stringify([selectedFilters, search, page, ready]);
	$: if (ready && loadTrigger) loadItems();

	let requestId = 0;

	async function loadItems() {
		const myId = ++requestId;
		loading = true;
		items = [];
		try {
			const data = await fetchItemsQuery({
				filters: getActiveFilters(),
				search,
				page,
				perPage,
				filterConfigs
			});
			if (myId !== requestId) return;
			items = data;
		} catch {
			if (myId !== requestId) return;
			items = [];
		} finally {
			if (myId === requestId) loading = false;
		}
	}
</script>

<header>
	<h1>{m.title()}</h1>
	<div class="flex gap-1">
		<button onclick={() => setLocale('en')}>en</button>
		<button onclick={() => setLocale('zh')}>zh</button>
	</div>
</header>

<!-- Keep only one of these mechanisms. Here we keep binding and remove on:search -->
<Search bind:value={search} />

<div style="display: flex; gap: 1em; margin-bottom: 1em;">
	{#each filterConfigs as f}
		<Filters
			prop={f.prop}
			label={m[f.labelKey]()}
			options={filterOptions[f.prop]}
			selected={selectedFilters[f.prop]}
			on:change={handleFilterChange}
		/>
	{/each}
</div>

{#if loading}
	<p>{m.loading()}</p>
{:else if items.length === 0}
	<p>{m.no_results()}</p>
{:else}
	<Zoom>
		{#snippet children(zoom)}
			<div class="index-list">
				{#each items as item (item['o:id'])}
					<Card {item} {zoom} />
				{/each}
			</div>
		{/snippet}
	</Zoom>
	<div style="margin: 1em 0;">
		<button onclick={prevPage} disabled={page === 1}>Prev</button>
		<span>Page {page}</span>
		<button onclick={nextPage} disabled={items.length < perPage}>Next</button>
	</div>
{/if}

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.1em;
	}
	.index-list {
		border: 1px solid #f1f1f1;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 1px 8px #eee;
		background: #fff;

		display: flex;
		flex-wrap: wrap;
	}
</style>
