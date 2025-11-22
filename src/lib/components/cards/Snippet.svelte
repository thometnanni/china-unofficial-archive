<script>
	let { snippets = [], href = '#', searchTerm = '', dataType = '' } = $props();
	const hasSnippets = $derived(Boolean(snippets?.length));

	function highlightSnippet({ term, snippet }) {
		const regex = new RegExp(`(${term})`);
		return snippet.replace(regex, '<mark>$1</mark>');
	}
</script>

{#if hasSnippets}
	<a {href} class="snippets z-1000 grid w-full min-w-0 gap-1 bg-white" data-type={dataType}>
		{#each snippets as snippet}
			<p class="line-clamp-4 text-xs leading-snug break-words opacity-80">
				{@html highlightSnippet(snippet)}
			</p>
		{/each}
	</a>
{/if}

<style>
	.snippets {
		padding: 0.5rem;
		border-top: 1px solid var(--color-card-primary);
		border-right: 1px solid var(--color-card-primary);
		border-left: 1px solid var(--color-card-primary);
	}
	:global(mark) {
		/* background: var(--color-card-primary);
		color: var(--color-black); */
		padding: 0 2px;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
	}
	.snippets {
		--color-card-primary: var(--color-type-object);
	}
	.snippets[data-type='4186'] {
		--color-card-primary: var(--color-type-object-book);
	}
	.snippets[data-type='4187'] {
		--color-card-primary: var(--color-type-object-article);
	}
	.snippets[data-type='4184'] {
		--color-card-primary: var(--color-type-object-periodical);
	}
	.snippets[data-type='4185'] {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	.snippets[data-type='4190'] {
		--color-card-primary: var(--color-type-object-video);
	}

	.snippets[data-type='creator'] {
		--color-card-primary: var(--color-type-creator);
	}
</style>
