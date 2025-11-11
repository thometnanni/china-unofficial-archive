<script>
	let { snippets = [], href = '#', searchTerm = '', dataType = '' } = $props();
	const hasSnippets = $derived(Boolean(snippets?.length));
	function escapeRegex(s) {
		return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
	function escapeHtml(s) {
		return String(s).replace(
			/[&<>"']/g,
			(m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]
		);
	}
	function stripTags(s) {
		return String(s)
			.replace(/<[^>]*>/g, '')
			.replace(/&lt;[^&]*?&gt;/g, '');
	}
	function highlightSnippet(s, q) {
		const base = stripTags(s);
		if (!q) return escapeHtml(base);
		const t = Array.from(new Set(q.split(/\s+/).filter(Boolean)));
		if (!t.length) return escapeHtml(base);
		const re = new RegExp('(' + t.map(escapeRegex).join('|') + ')', 'gi');
		return escapeHtml(base).replace(re, '<mark>$1</mark>');
	}

//   console.log(snippets)
</script>

{#if hasSnippets}
	<a {href} class="z-1000 bg-white snippets grid w-full min-w-0 gap-1" data-type={dataType}>
		{#each snippets.slice(0, 2) as s}
			<p class="line-clamp-4 text-xs leading-snug break-words opacity-80">
				{@html highlightSnippet(s, searchTerm)}
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
