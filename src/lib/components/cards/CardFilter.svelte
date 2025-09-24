<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class="col-span-2 row-span-1 flex h-fit w-full items-end bg-brand-blue p-1"
>
	<div class="w-full text-left">
		<div class={odd ? 'ml-0' : 'ml-0'}>
			{#if item.type}
				<span class="block text-xs leading-[var(--lh-tight)] tracking-wide uppercase">
					<span class="bg-white px-1">{item.type}</span>
				</span>
			{/if}
		</div>

		<div class={odd ? 'ml-2' : 'ml-0'}>
			{#if item.title}
				<h3 class="m-0 text-xl leading-[var(--lh-tight)] font-medium break-words text-black">
					<span class="bg-white box-decoration-clone px-1">{item.title}</span>
				</h3>
			{/if}
		</div>
	</div>
</a>
