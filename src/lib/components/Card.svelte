<script>
	import { inkFilter } from '$lib/filter.js';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
</script>

<a href={'archive/' + item.id} class="block h-full w-full">
	<div class="relative h-full">
		{#if item.thumbnail}
			<img
				src={item.thumbnail}
				alt={'cover of ' + item.title}
				class="h-full w-full object-cover"
				loading="lazy"
				crossorigin="anonymous"
				use:inkFilter={{ ink: '#000', paper: '#fff', bandAmp: 15, noise: 20 }}
			/>
		{/if}

		<div class="absolute inset-x-0 bottom-0">
			<div class={odd ? 'ml-0' : 'ml-2'}>
				{#if item.type}
					<span
						class="inline-block bg-white px-2 py-0.5 text-[10px] tracking-wide text-black uppercase"
					>
						{item.type}
					</span>
				{/if}
			</div>
			<div class={odd ? 'ml-2' : 'ml-0'}>
				{#if item.title}
					<h3 class="inline-block bg-white px-2 py-1 text-base leading-snug text-black sm:text-lg">
						{item.title}
					</h3>
				{/if}
			</div>
		</div>
	</div>
</a>
