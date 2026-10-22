<script>
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import CardCreator from '#lib/components/cards/CardCreator.svelte';
	import CardObject from '#lib/components/cards/CardObject.svelte';
	import CardFilter from '#lib/components/cards/CardFilter.svelte';

	let { item } = $props();

	let href = $derived(localizeHref(`/archive/${item.id}`));
	let CardComponent = $derived.by(() => {
		if (item.objectType != null) return CardObject;
		switch (item.type) {
			case 'creator':
				return CardCreator;
			case 'object':
				return CardObject;
			default:
				return CardFilter;
		}
	});
</script>

<CardComponent {item} {href}></CardComponent>
