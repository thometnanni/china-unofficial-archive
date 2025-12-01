<script>
	import { m } from '$lib/paraglide/messages';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import CardNewsletter from '$lib/components/cards/CardNewsletter.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { items = [] } = $props();
</script>

<h2 class="custom-outline mb-8 text-xl leading-[var(--lh-tight)] font-medium sm:text-4xl">
	<a href={localizeHref('/archive?objectType=4185/')} class="bg-white">
		<button class="">{m.nav_newsletter()}</button>
	</a>
</h2>
<div class="w-full border border-type-object-newsletter bg-type-object-newsletter/10 text-black">
	<section>
		<!-- <div class="px-2 py-1 text-2xl">{m.nav_newsletter()}</div> -->
		<div class="grid gap-1">
			{#each items.slice(0, 7) as item}
				<CardNewsletter {item} />
			{/each}
		</div>

		<a
			href="https://chinaunofficialarchives.substack.com/"
			class="mt-2 block w-full pb-2 text-center text-xl underline"
		>
			<button class="bg-white">{m.all()}</button>
		</a>
	</section>
</div>

<style>
	@reference "../../app.css";

	button {
		@apply cursor-pointer border border-type-object-newsletter px-1;

		&.is-active,
		&:hover {
			@apply border-white bg-type-object-newsletter text-white;
		}

		&.is-active {
			@apply cursor-default;
		}
	}
</style>
