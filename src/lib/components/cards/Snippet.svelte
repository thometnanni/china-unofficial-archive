<script>
	let { snippets = [], href = '#', searchTerm = '', objectType = '' } = $props();
	const hasSnippets = $derived(Boolean(snippets?.length));

	function escapeTerm(term) {
		return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function highlightSnippet({ term, snippet }) {
		if (!term) return snippet;
		const regex = new RegExp(`(${escapeTerm(term)})`, 'gi');
		return snippet.replace(regex, '<mark>$1</mark>');
	}
</script>

{#if hasSnippets}
	<a {href} class="snippets bg-white" data-type={objectType}>
		{#each snippets as snippet}
			<p class="mb-2 line-clamp-4 text-base break-words opacity-80">
				{@html highlightSnippet(snippet)}
			</p>
		{/each}
	</a>
{/if}

<style>
	.snippets {
		/* font-style: italic; */
		padding: 0.5rem;
		/* border: 1px solid var(--color-card-primary); */
		align-content: start;
	}

	.snippets * {
		max-width: var(--cardSize);
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

	.snippets[data-type='4184'],
	.snippets[data-type='4561'] {
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

	:global(mark) {
		background: color-mix(in srgb, var(--color-card-primary), transparent 65%);
		color: var(--color-black);
		padding: 0 2px;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
	}
</style>
