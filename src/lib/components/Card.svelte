<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import CardCreator from '$lib/components/cards/CardCreator.svelte';
	import CardObject from '$lib/components/cards/CardObject.svelte';
	import CardFilter from '$lib/components/cards/CardFilter.svelte';

	let { item, i = 0 } = $props();

	let href = $derived(`/archive/${item.id}`);
	let CardComponent = $derived.by(() => {
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
