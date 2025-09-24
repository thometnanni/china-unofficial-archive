<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	let { item, i = 0 } = $props();
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class="col-span-2 row-span-1 flex h-full w-full items-end bg-brand-blue p-1 hover:bg-black"
>
	<div class="h-full w-full text-left">
		{#if item.title}
			<h3 class="m-0 text-xl leading-[var(--lh-tight)] font-medium break-words text-black">
				<span class="bg-white box-decoration-clone px-1">{item.title}</span>
			</h3>
		{/if}
	</div>
</a>
