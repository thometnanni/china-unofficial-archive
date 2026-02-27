<script>
	import { query } from '$lib/api';

	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { creator } from 'd3-selection';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import { page } from '$app/stores';
	import { normalizeDescription } from '$lib/utils/normalize.js';
	import Share from './Share.svelte';

	let item = $derived($page.data.item);

	const dataType = $derived(
		String(item?.objectType?.[0]?.id || '')
			.toLowerCase()
			.trim()
	);

	const description = $derived(normalizeDescription(item?.description));
</script>

{#if item}
	<section class="m-auto flex max-w-[840px] flex-col gap-2 p-2 px-4" data-type={dataType}>
		<h2 class="title z-10 mt-[-1em] mb-5 ml-[0] text-3xl sm:text-5xl">
			<TextOutlined>{item.title}</TextOutlined>
		</h2>

		{#if item.titleAlt?.length > 0}
			<h3 class="title sm:text-2x mb-3 text-2xl">
				<TextOutlined>{item.titleAlt}</TextOutlined>
			</h3>
		{/if}

		<div class={`mb-2 flex flex-wrap gap-2`}>
			{#each item.creator as creator}
				{#if creator.title}
					<a class="person creatorTag" href={localizeHref(`/archive/${creator.id}`)}>
						<TextOutlined>
							{creator.title}
						</TextOutlined>
					</a>
				{/if}
			{/each}

			{#each item.objectType as objectType}
				{#if objectType.title}
					<a
						class="{item.type} type tag box-decoration-clone text-white"
						href={localizeHref(`/archive/?objectType=${objectType.id}`)}
					>
						<TextOutlined>
							{objectType.title}
						</TextOutlined>
					</a>
				{/if}
			{/each}

			{#each item.theme ?? [] as theme}
				{#if theme.title}
					<a
						class="theme filter {item.type} tag leading-loose"
						href={localizeHref(`/archive/?theme=${theme.id}`)}
					>
						<TextOutlined>
							{theme.title}
						</TextOutlined>
					</a>
				{/if}
			{/each}

			{#each item.era ?? [] as era}
				{#if era.title}
					<a
						class="era filter {item.type} tag leading-loose"
						href={localizeHref(`/archive/?era=${era.id}`)}
					>
						<TextOutlined>
							{era.title}
						</TextOutlined>
					</a>
				{/if}
			{/each}
		</div>

		<span class="share">
			<TextOutlined>
				<Share />
			</TextOutlined>
		</span>

		<div class="item-container mt-8 flex flex-col gap-4 text-xl">
			{#each description as paragraph, index}
				<p>{@html paragraph}</p>
				{#if index === 0 && item.thumbnail}
					<img
						src={item.thumbnailLarge ?? item.thumbnail}
						alt=""
						class="my-8 block max-h-[75vh] self-center justify-self-center"
					/>
				{/if}
			{/each}
		</div>
	</section>
{/if}

<style>
	.title {
		/* --color-outlined-text: var(--color-card-primary); */
		--color-outlined-border: var(--color-brand-purple);
	}

	.tag {
		--color-outlined-border: var(--color-type-default);
		--color-outlined-bg: var(--color-type-default);
	}

	.type {
		--color-outlined-text: var(--color-white);
		--color-outlined-border: var(--color-card-primary);
		--color-outlined-bg: var(--color-card-primary);
	}

	.creatorTag {
		--color-outlined-text: var(--color-white);
		--color-outlined-border: var(--color-type-creator);
		--color-outlined-bg: var(--color-type-creator);
	}

	.era {
		/* --color-outlined-text: var(--color-white); */
		--color-outlined-border: var(--color-type-era);
		--color-outlined-bg: var(--color-type-era);
	}

	.theme {
		/* --color-outlined-text: var(--color-white); */
		--color-outlined-border: var(--color-type-theme);
		--color-outlined-bg: var(--color-type-theme);
	}

	.share {
		--color-outlined-border: var(--color-brand-purple);
	}

	.tag:hover,
	.creatorTag:hover {
		--color-outlined-bg: var(--color-black);
		--color-outlined-text: var(--color-white);
		--color-outlined-border: var(--color-black);
	}

	section {
		--color-card-primary: var(--color-type-object);
	}
	section[data-type='4186'] {
		--color-card-primary: var(--color-type-object-book);
	}
	section[data-type='4187'] {
		--color-card-primary: var(--color-type-object-article);
	}
	section[data-type='4184'],
	section[data-type='4561'] {
		--color-card-primary: var(--color-type-object-periodical);
	}
	section[data-type='4185'] {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	section[data-type='4190'] {
		--color-card-primary: var(--color-type-object-video);
	}

	:global(.item-container a) {
		text-decoration: underline;
	}
</style>
