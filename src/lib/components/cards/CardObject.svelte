<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class="card col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 gap-8"
>
	<div class="col-[1/3] row-[1/4] border border-card-primary">
		<div class="relative h-full p-1">
			<ImageFilter src={item.thumbnail} alt={item.title} />

			{#if item.objectType}
				<div class="absolute top-1 left-[calc(var(--spacing)_*_-4)] text-balance">
					{#each item.objectType as objectType}
						<h4>
							<span class="border border-card-primary bg-white box-decoration-clone px-1">
								{objectType.title}
							</span>
						</h4>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	{#if item.title}
		<div class="z-10 col-[2/4] row-[1/4] flex items-end">
			<h3 class="mb-2 ml-4 leading-[var(--lh-tight)] text-balance text-black">
				<span class="border border-card-primary bg-white box-decoration-clone px-1">
					{item.title}
				</span>
			</h3>
		</div>
		<div class="z-10 col-[2/4] row-[1/4] flex items-end">
			<h3 class="mb-2 ml-4 leading-[var(--lh-tight)] text-balance text-black">
				<span class="border-r border-l border-card-primary bg-white box-decoration-clone px-1">
					{item.title}
				</span>
			</h3>
		</div>
	{/if}
</a>

<style>
	.card {
		--color-card-primary: var(--color-type-object);
	}
</style>
