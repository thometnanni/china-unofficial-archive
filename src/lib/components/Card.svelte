<script>
	import { inkFilter } from '$lib/filter.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;

	// console.log(item)
</script>

<a href={localizeHref('/archive/' + item.id)} class="block h-full w-full">
	<div class="relative h-full">
		{#if item.thumbnail}
			<img
				src={item.thumbnail}
				alt={item.title}
				class="h-full w-full object-cover"
				crossorigin="anonymous"
				use:inkFilter={{ ink: '#000', paper: '#fff', bandAmp: 15, noise: 20 }}
			/>
		{/if}

		<div class="absolute inset-x-0 bottom-0">
			<div class={odd ? 'ml-0' : 'ml-4'}>
				{#if item.type}
					<span class="block text-xs leading-[1.1] tracking-wide uppercase">
						<span class="bg-brand-gold px-1">{item.type}</span>
					</span>
				{/if}
			</div>

			<div class={odd ? 'ml-4' : 'ml-0'}>
				{#if item.title}
					<h3 class="m-0 text-base leading-[1.1] font-medium text-black sm:text-lg">
						<span class="bg-brand-gold box-decoration-clone px-1">
							{item.title}
						</span>
					</h3>
				{/if}
			</div>
		</div>
	</div>
</a>
