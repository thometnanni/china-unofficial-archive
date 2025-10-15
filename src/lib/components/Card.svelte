<script>
	import CardCreator from '$lib/components/cards/CardCreator.svelte';
	import CardObject from '$lib/components/cards/CardObject.svelte';
	import CardFilter from '$lib/components/cards/CardFilter.svelte';
	let { item, i = 0 } = $props();
	// console.log(item);
</script>

{#if item.type === 'creator'}
	<CardCreator {item} {i} />
{:else if item.type === 'object'}
	<CardObject {item} {i} />
{:else}
	<CardFilter {item} {i} />
{/if}
