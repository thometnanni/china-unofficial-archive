<script>
	import TextOutlined from './TextOutlined.svelte';
	let { item, close } = $props();
</script>

<span class={`search-tag ${item.type}`} data-id={item.id} role="button">
	<TextOutlined>
		{item.title ?? item.value}{close ? ' ×' : ''}
	</TextOutlined>
</span>

<style>
	.search-tag {
		cursor: default;
		--color-outlined-border: var(--color-type-default);
		--color-outlined-bg: var(--color-type-default);
	}
	.search-tag:hover {
		--color-outlined-bg: var(--color-brand-white);
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
