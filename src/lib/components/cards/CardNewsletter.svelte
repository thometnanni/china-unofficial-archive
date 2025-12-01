<script>
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';

	let { item } = $props();

	const description = $derived(item.description || item.titleAlt || item.text || '');
	const dateLabel = $derived.by(() => {
		const rawDate = item?.date ?? item?.published;
		if (!rawDate) return '';
		const date = new Date(rawDate);
		return Number.isNaN(date.getTime()) ? String(rawDate) : date.toLocaleDateString();
	});
</script>

<a href={item.url} class="newsletter-card group relative block overflow-hidden">
	<!-- <div class="absolute top">
		<ImageFilter />
	</div> -->

	<div class="relative z-10 flex flex-col gap-2 px-3 py-3">
		{#if dateLabel}
			<TextOutlined as="p" class="text-xs tracking-wide uppercase">{dateLabel}</TextOutlined>
		{/if}

		{#if item.title}
			<TextOutlined as="h3" class="text-lg leading-snug">{item.title}</TextOutlined>
		{/if}

		{#if description}
			<p class="line-clamp-3 text-sm leading-snug opacity-80">{description}</p>
		{/if}
	</div>
</a>

<style>
	.newsletter-card {
		--color-card-primary: var(--color-type-object-newsletter);
		border-color: var(--color-card-primary);

		&:hover {
			--color-outlined-border: var(--color-card-primary);
			--color-outlined-bg: var(--color-card-primary);
			--color-outlined-text: var(--color-white);
		}
	}
</style>
