<script>
	let { media } = $props();
</script>

<article class="editorial m-auto mt-5 mb-10 max-w-[840px] p-3 px-4 text-xl">
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
		justify-self: center;
	}
</style>
