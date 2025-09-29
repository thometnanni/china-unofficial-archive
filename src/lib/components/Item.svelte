<script>
	import { query } from '$lib/api';
	import { inkFilter } from '$lib/filter.js';

	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { creator } from 'd3-selection';

	const { item } = $props();
	console.log(item);
</script>

<section class="flex flex-col gap-4 p-2">
	{#if item.thumbnail && item.type == 'creator'}
		<div class="{item.type} card">
			<img
				src={item.thumbnail}
				alt=""
				crossorigin="anonymous"
				class="block max-h-80 w-full object-cover"
				use:inkFilter={{ ink: '#000', paper: '#fff', bandAmp: 15, noise: 20 }}
			/>
		</div>
	{/if}

	<h2 class="text-2xl">{item.title}</h2>
	<h3 class="text-xl">{item.titleAlt}</h3>
	<p>
		{item.published}
	</p>
	<p>
		{#each item.creator as creator}
			<a class="person bg-gray-200 px-2 py-1" href={localizeHref(`/archive/${creator.id}`)}
				>{creator.title}</a
			>
		{/each}
	</p>
	<p>
		{#each item.objectType as objectType}
			<a
				class="{item.type} bg-gray-200 box-decoration-clone px-2 py-1 text-white"
				href={localizeHref(`/archive/${objectType.id}`)}>{objectType.title}</a
			>
		{/each}
	</p>
	<p class="text-xs">
		{#each [...(item.theme ?? []), ...(item.era ?? [])] as theme}
			<a
				class="mr-1 filter {item.type} box-decoration-clone px-1"
				href={localizeHref(`/archive/${theme.id}`)}
			>
				{theme.title}
			</a>
		{/each}
	</p>
	<div>
		{@html item.description}
	</div>
</section>

<style>
</style>
