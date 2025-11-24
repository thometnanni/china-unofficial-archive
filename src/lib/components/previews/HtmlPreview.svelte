<script>
	let { media } = $props();
</script>

<article class="editorial m-auto px-4 mt-5 max-w-[840px] p-3 mb-10 text-xl">
	{@html media.replace(/<p>(?:&nbsp;|\s)*<\/p>/g, '') ?? ''}
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
		/* margin-left: -5em; */
	}
</style>
