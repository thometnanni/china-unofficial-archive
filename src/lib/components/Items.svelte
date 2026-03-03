<script>
	import Card from './Card.svelte';
	const { items } = $props();
</script>

<section class="m-auto max-w-[1648px] pt-8 pb-10">
	<div class="base-grid">
		{#each items as item, i}
			<Card {item} {i} />
		{/each}
	</div>
</section>
