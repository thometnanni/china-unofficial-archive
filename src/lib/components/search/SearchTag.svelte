<script>
	import { createEventDispatcher } from 'svelte';
	let { item, close, disabled = false, class: className = '', showCount = true } = $props();
	let label = $derived.by(() => item?.label ?? item?.title ?? item?.value ?? '');
	let count = $derived.by(() => item?.availableCount ?? item?.baseCount ?? item?.count);
	let isDisabled = $derived.by(() => disabled && !close);
	const dispatch = createEventDispatcher();

	function handleClick(event) {
		if (isDisabled) return;
		dispatch('click', event);
	}
</script>

<button
	class={`search-tag ${item.type ?? ''} ${className} inline-flex max-w-full items-start justify-start gap-1 rounded-none border border-[var(--color-outlined-border)] bg-[var(--color-outlined-bg)] px-0.5 py-0.5 text-left text-sm leading-tight break-words whitespace-normal enabled:hover:bg-black enabled:hover:text-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40`}
	data-id={item.id}
	type="button"
	disabled={isDisabled}
	on:click={handleClick}
	aria-disabled={isDisabled}
>
	<span class="label">{label}</span>
	{#if showCount && count != null}
		<span class="count text-xs opacity-80">({count})</span>
	{/if}
	{#if close}
		<span aria-hidden="true">×</span>
	{/if}
</button>

<style>
	.search-tag {
		--color-outlined-border: var(--color-type-default);
		--color-outlined-bg: var(--color-type-default);
	}
	.search-tag.objectType {
		--color-outlined-border: var(--color-type-object);
		--color-outlined-bg: var(--color-type-object);
	}
	.search-tag.creator {
		--color-outlined-border: var(--color-type-creator);
		--color-outlined-bg: var(--color-type-creator);
	}
	.search-tag.era {
		--color-outlined-border: var(--color-type-era);
		--color-outlined-bg: var(--color-type-era);
	}
	.search-tag.search {
		--color-outlined-border: var(--color-brand-yellow);
		--color-outlined-bg: var(--color-brand-yellow);
	}

	.search-tag[data-id='4186'] {
		--color-outlined-border: var(--color-type-object-book);
		--color-outlined-bg: var(--color-type-object-book);
	}
	.search-tag[data-id='4187'] {
		--color-outlined-border: var(--color-type-object-article);
		--color-outlined-bg: var(--color-type-object-article);
	}
	.search-tag[data-id='4184'] {
		--color-outlined-border: var(--color-type-object-periodical);
		--color-outlined-bg: var(--color-type-object-periodical);
	}
	.search-tag[data-id='4185'] {
		--color-outlined-border: var(--color-type-object-newsletter);
		--color-outlined-bg: var(--color-type-object-newsletter);
	}
	.search-tag[data-id='4190'] {
		--color-outlined-border: var(--color-type-object-video);
		--color-outlined-bg: var(--color-type-object-video);
	}
</style>
