<script>
	import { onMount } from 'svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { query } from '$lib/api';

	let { title = '', html = null, splashImages = [] } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="m-auto min-h-screen max-w-[1640px] bg-white">
	<section class="mx-auto prose px-10 py-8">
		<h2 class="title z-10 mt-[-1em] mb-5 ml-[0] text-3xl sm:text-5xl lg:ml-[-2em]">
			<TextOutlined>{title}</TextOutlined>
		</h2>

		{#if html != ''}
			<article>{@html html}</article>
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
