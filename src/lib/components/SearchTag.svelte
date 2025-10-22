<script>
	import TextOutlined from './TextOutlined.svelte';

	let { item, close } = $props();
</script>

<span class={['search-tag', item.type]} role="button">
	<TextOutlined>{item.title ?? item.value}{close ? ' ×' : ''}</TextOutlined>
</span>

<style>
	.search-tag {
		cursor: default;
		--color-outlined-border: var(--color-type-default);
		--color-outlined-bg: var(--color-type-default);

		&:hover {
			--color-outlined-bg: var(--color-white);
		}
	}
	.object {
		--color-outlined-border: var(--color-type-object);
		--color-outlined-bg: var(--color-type-object);
	}

	.creator {
		--color-outlined-border: var(--color-type-creator);
		--color-outlined-bg: var(--color-type-creator);
	}

	.era {
		--color-outlined-border: var(--color-type-era);
		--color-outlined-bg: var(--color-type-era);
	}

	.search {
		--color-outlined-border: var(--color-brand-yellow);
		--color-outlined-bg: var(--color-brand-yellow);
	}
</style>
