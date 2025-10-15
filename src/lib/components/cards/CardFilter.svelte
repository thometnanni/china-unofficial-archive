<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	let { item, i = 0 } = $props();
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class={['card col-span-3 row-span-1 border border-card-primary', item.type]}
>
	<div class="relative h-full p-1">
		<ImageFilter />
		<h3
			class="absolute top-2 left-[calc(var(--spacing)_*_-4)] leading-[var(--lh-tight)] text-balance"
		>
			<span class="border border-card-primary bg-white box-decoration-clone px-1">
				{item.title}
			</span>
		</h3>
	</div>
</a>

<style>
	.era {
		--color-card-primary: var(--color-type-era);
	}
</style>
