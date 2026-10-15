<script>
	import { sanitize } from '#lib/utils/sanitize.js';
	import TextOutlined from '#lib/components/TextOutlined.svelte';

	let { title = '', html = null } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="m-auto min-h-screen max-w-[1640px]">
	<section class="mx-auto prose px-10 py-8">
		<h2 class="title z-10 mb-5 ml-0 text-3xl sm:text-5xl lg:ml-[-2em]">
			<TextOutlined>{title}</TextOutlined>
		</h2>

		{#if html != ''}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<article>{@html sanitize(html)}</article>
		{/if}
	</section>
</main>

<style>
	h2 {
		--color-outlined-border: var(--color-brand-purple);
	}
	section {
		max-width: 800px;
		margin: 0 auto;
	}
</style>
