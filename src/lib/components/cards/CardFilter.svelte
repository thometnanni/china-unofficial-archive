<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	let { item, i = 0 } = $props();
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class="card col-span-2 row-span-1 flex h-full w-full items-end p-1 filter"
>
	<div class="h-full w-full text-left">
		{#if item.title}
			<ImageFilter color="#00FFA0" />
			<h3 class="m-0 text-base leading-[var(--lh-tight)] font-medium break-words text-black">
				<span class="bg-white box-decoration-clone px-1">{item.title}</span>
			</h3>
		{/if}
	</div>
</a>
