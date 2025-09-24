<script>
	import { inkFilter } from '$lib/filter.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
	const hasImage = Boolean(item?.thumbnail);
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class={`${hasImage ? 'card col-span-3 row-span-2 ' : 'card col-span-2 row-span-1 '} block h-full w-full p-1`}
>
	{#if hasImage}
		<div
			class="relative grid h-full grid-cols-3 grid-rows-2 overflow-hidden bg-brand-grayblue p-1 hover:bg-brand-cream"
		>
			<img
				src={item.thumbnail}
				alt={item.title}
				class={`row-span-2 h-full w-full object-cover ${odd ? 'col-span-2 col-start-2' : 'col-span-2 col-start-1'}`}
				crossorigin="anonymous"
				use:inkFilter={{ ink: '#000', paper: '#fff', bandAmp: 15, noise: 20 }}
			/>

			<div
				class={`row-span-2 flex items-end ${odd ? 'col-start-1 text-right' : 'col-start-3 text-left'}`}
			>
				<div class="w-full">
					<div class={odd ? 'ml-4' : 'ml-0'}>
						{#if item.title}
							<h3
								class="m-0 text-base leading-[var(--lh-tight)] font-medium break-words text-black sm:text-lg"
							>
								<span class="bg-white box-decoration-clone px-1">{item.title}</span>
							</h3>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex h-full items-end bg-white p-3">
			<div class="w-full">
				{#if item.type}
					<span class="block text-xs leading-[var(--lh-tight)] tracking-wide uppercase">
						<span class="bg-brand-teal px-1">{item.type}</span>
					</span>
				{/if}
				{#if item.title}
					<h3
						class="m-0 text-base leading-[var(--lh-tight)] font-medium break-words text-black sm:text-lg"
					>
						<span class="bg-brand-teal box-decoration-clone px-1">{item.title}</span>
					</h3>
				{/if}
			</div>
		</div>
	{/if}
</a>
