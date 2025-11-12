<script>
	let { media } = $props();
</script>

<article class="editorial text-xl mt-5">
	{@html media.html?.replace(/<p>(?:&nbsp;|\s)*<\/p>/g, '') ?? ''}
</article>

<style>
	:global(.editorial p) {
		margin-bottom: 1em;
	}

	:global(.editorial a) {
		color: var(--color-brand-cover);
		text-decoration: underline;
	}

	:global(.editorial img) {
		max-height: 500px;
		object-fit: contain;
		object-position: left;
		margin-left: -5em;
	}
</style>
