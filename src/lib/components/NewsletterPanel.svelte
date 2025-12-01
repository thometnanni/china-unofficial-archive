<script>
	import { m } from '$lib/paraglide/messages';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import CardNewsletter from '$lib/components/cards/CardNewsletter.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { items = [] } = $props();
</script>

<div class="w-full text-black">
	<section>
		<h2 class="custom-outline mb-4 text-xl leading-[var(--lh-tight)] font-medium sm:text-4xl">
			<a href={localizeHref('/archive?objectType=4185/')}>
				<TextOutlined class="mb-1 ">{m.nav_newsletter()}</TextOutlined>
			</a>
		</h2>
		<!-- <div class="px-2 py-1 text-2xl">{m.nav_newsletter()}</div> -->
		<div class="grid gap-3">
			{#each items.slice(0, 7) as item}
				<CardNewsletter {item} />
			{/each}
		</div>

		<a
			href="https://chinaunofficialarchives.substack.com/"
			class="block mt-2 w-full text-center text-xl underline "
		>
			<button>{m.all()}</button>
		</a>
	</section>
</div>

<style>
	@reference "../../app.css";

	.custom-outline {
		cursor: pointer;
		--color-outlined-border: var(--color-type-object-newsletter);
		--color-outlined-bg: var(--color-white);

		&:hover {
			--color-outlined-bg: var(--color-type-object-newsletter);
			--color-outlined-text: var(--color-white);
		}
	}

	button {
		@apply cursor-pointer border border-type-object-newsletter bg-white px-1;

		&.is-active,
		&:hover {
			@apply border-white bg-type-object-newsletter text-white;
		}

		&.is-active {
			@apply cursor-default;
		}
	}
</style>
