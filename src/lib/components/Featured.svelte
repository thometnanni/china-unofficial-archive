<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	const featured = await query('featured');

	const newsletters = await query('newsletters');
</script>

<div class="flex">
	<section class="featured flex-2">
		{#each featured as item}
			<div>
				<img src={item.thumbnail} width="100" alt="cover of {item.title}" />
				<h4>{item.type}</h4>
				<h3>{item.title}</h3>
			</div>
		{/each}
	</section>
	<section class="newsletters flex-1">
		{#each newsletters.items as item}
			<a href={item.url}>
				<img src={item.image} width="50" alt="cover of {item.title}" />
				<h4>{new Date(item.date).toLocaleDateString()}</h4>
				<h3>{item.title}</h3>
			</a>
		{/each}
	</section>
</div>

<style>
</style>
