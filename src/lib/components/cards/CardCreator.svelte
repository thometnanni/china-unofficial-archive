<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
	const hasImage = Boolean(item?.thumbnail);
</script>

<a
	href={localizeHref(`/archive/${item.id}`)}
	class="card col-span-4 row-span-4 border border-card-primary"
>
	<div class="relative h-full p-1">
		<ImageFilter src={item.thumbnail} color="var(--color-card-primary)" />
		<h3 class="absolute right-[calc(var(--spacing)_*_-4)] bottom-4 text-right text-xl text-balance">
			<span class="border border-card-primary bg-white box-decoration-clone px-1">
				{item.title}
			</span>
		</h3>
		<!-- <img src={item.thumbnail} alt={item.title} /> -->

		<!-- <div
				class={`row-span-2 flex items-end ${odd ? 'col-start-1 text-right' : 'col-start-3 text-left'}`}
			>
				<div class="w-full">
					<div class={odd ? 'ml-4' : 'ml-0'}>
						{#if item.title}
							<h3
								class="m-0 text-base leading-[var(--lh-tight)] font-medium break-words text-black"
							>
								<span class="bg-white box-decoration-clone px-1">{item.title}</span>
							</h3>
						{/if}
					</div>
				</div>
			</div> -->
	</div>
</a>

<style>
	.card {
		--color-card-primary: var(--color-type-creator);

		/* Add these styles */
	}
</style>
