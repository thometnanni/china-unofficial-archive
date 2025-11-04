<script>
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { createEventDispatcher } from 'svelte';
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
	function highlightSnippet(s, q) {
		if (!q) return escapeHtml(s);
		const t = Array.from(new Set(q.split(/\s+/).filter(Boolean)));
		if (!t.length) return escapeHtml(s);
		const re = new RegExp('(' + t.map(escapeRegex).join('|') + ')', 'gi');
		return escapeHtml(s).replace(re, '<mark>$1</mark>');
	}
</script>

{#if hasSnippets}
	<a {href} class="snippets grid w-full min-w-0 gap-1" data-type={dataType}>
		{#each snippets.slice(0, 3) as s}
			<p class="line-clamp-2 text-xs leading-snug break-words opacity-80">
				{@html highlightSnippet(s, searchTerm)}
			</p>
			<!-- <TextOutlined class="text-[10px] leading-snug break-all opacity-80"
				>{@html highlightSnippet(s, searchTerm)}
			</TextOutlined> -->
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
		background: var(--color-brand-yellow);
    background: var(--color-card-primary);
		color: var(--color-black);
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
</style>
