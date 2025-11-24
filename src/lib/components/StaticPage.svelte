<script>
	import { onMount } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { query } from '$lib/api';
 
	let { title = '', html = null, splashImages = [] } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="min-h-screen bg-white max-w-[1640px] m-auto">
	<section class="mx-auto prose px-10 py-8">
		<h1 class="mb-4">{title}</h1>
		{#if html != ''}
			<article>{@html html}</article>
		{/if}
	</section>
</main>

<style>
	section {
		max-width: 800px;
		margin: 0 auto;
	}
</style>
