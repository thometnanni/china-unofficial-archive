<script>
	import { sanitize } from '#lib/utils/sanitize.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import { m } from '#lib/paraglide/messages.js';
	import { query } from '#lib/api.js';
	import TextOutlined from '#lib/components/TextOutlined.svelte';
	import { page } from '$app/state';
	import { normalizeDescription } from '#lib/utils/normalize.js';
	import Share from './Share.svelte';

	let item = $derived(page.data.item);
	const dataType = $derived(
		String(item?.objectType?.[0]?.id || '')
			.toLowerCase()
			.trim()
	);

	let showOriginal = $state(false);
	let original = $state(null);
	let originalLoading = $state(false);
	let originalFailed = $state(false);

	// Reset the original-text state when navigating to another item
	$effect(() => {
		item?.id;
		showOriginal = false;
		original = null;
		originalLoading = false;
		originalFailed = false;
	});

	const shown = $derived(showOriginal && original ? original : item);
	const description = $derived(normalizeDescription(shown?.description));
	// Language of the text currently shown when it is the original (pre-conversion) version
	const originalLang = $derived(
		showOriginal && original ? (item?.convertedFrom === 'zh-hk' ? 'zh-HK' : 'zh-CN') : null
	);

	function variantLabel(code) {
		return code === 'zh-hk' ? m.variant_traditional() : m.variant_simplified();
	}

	async function toggleOriginal() {
		if (showOriginal) {
			showOriginal = false;
			return;
		}
		showOriginal = true;
		if (original || originalLoading) return;

		const id = item.id;
		originalLoading = true;
		originalFailed = false;
		try {
			const res = await query(`item/${id}`, window.fetch, item.convertedFrom);
			if (!res.ok) throw new Error(res.statusText);
			const data = await res.json();
			if (item?.id === id) original = data;
		} catch {
			if (item?.id === id) originalFailed = true;
		} finally {
			if (item?.id === id) originalLoading = false;
		}
	}
</script>

{#if item}
	<section class="m-auto flex max-w-210 flex-col gap-2 p-2 px-4" data-type={dataType}>
		<h2 class="title z-10 mt-[-1em] mb-5 ml-0 text-3xl sm:text-5xl" lang={originalLang}>
			<TextOutlined>{shown.title}</TextOutlined>
		</h2>

		{#if shown.titleAlt?.length > 0}
			<h3 class="title sm:text-2x mb-3 text-2xl" lang={originalLang}>
				<TextOutlined>{shown.titleAlt}</TextOutlined>
			</h3>
		{/if}

		<div class="mb-2 flex flex-wrap gap-2">
			{#each item.creator as creator (creator.id)}
				{#if creator.title}
					<a class="person creatorTag" href={localizeHref(`/archive/${creator.id}`)}>
						<TextOutlined>
							{creator.title}
						</TextOutlined>
					</a>
				{/if}
			{/each}

			{#each item.objectType as objectType (objectType.id)}
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

			{#each item.theme ?? [] as theme (theme.id)}
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

			{#each item.era ?? [] as era (era.id)}
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

		{#if item.convertedFrom != null}
			<div
				class="converted-note mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 self-start border border-brand bg-brand/10 px-1 text-base"
			>
				<span>{m.converted_note({ from: variantLabel(item.convertedFrom) })}</span>
				<button
					type="button"
					class="underline"
					aria-pressed={showOriginal}
					onclick={toggleOriginal}
				>
					{showOriginal ? m.view_converted() : m.view_original()}
				</button>
				{#if originalLoading}
					<span>{m.loading()}</span>
				{/if}
				{#if originalFailed}
					<span role="alert">{m.original_load_failed()}</span>
				{/if}
			</div>
		{/if}

		<div class="item-container mt-8 flex flex-col gap-4 text-xl" lang={originalLang}>
			{#each description as paragraph, i (i)}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html sanitize(paragraph)}</p>
				{#if i === 0 && item.thumbnail}
					<img
						src={(item.thumbnailLarge ?? item.thumbnail) &&
							`${item.thumbnailLarge ?? item.thumbnail}?imagesize=inline`}
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
