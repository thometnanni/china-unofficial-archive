<script>
	import { inkFilter } from '$lib/filter.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class="card col-span-2 row-span-1 block h-full w-full hover:bg-brand-cream bg-black"
>
	<div class="relative h-full p-1">
		{#if item.thumbnail}
			<img
				src={item.thumbnail}
				alt={item.title}
				class="h-full w-full object-cover"
				crossorigin="anonymous"
				use:inkFilter={{ ink: '#000', paper: '#fff', bandAmp: 15, noise: 20 }}
			/>
		{/if}

		<div class="absolute inset-x-0 bottom-0 p-1">
			{#if item.type}
				<div class={odd ? 'ml-0' : 'ml-4'}>
					<span class="block text-xs leading-[var(--lh-tight)] tracking-wide uppercase">
						<span class="bg-brand-cream px-1">
							{item.objectType?.map(({ title }) => title).join(', ')}
						</span>
					</span>
				</div>
			{/if}

			{#if item.title}
				<div class={odd ? 'ml-4' : 'ml-0'}>
					<h3 class="m-0 text-base leading-[var(--lh-tight)] font-medium text-black sm:text-lg">
						<span class="bg-brand-cream box-decoration-clone px-1">{item.title}</span>
					</h3>
				</div>
			{/if}
		</div>
	</div>
</a>
