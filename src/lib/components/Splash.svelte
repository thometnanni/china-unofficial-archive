<script>
	import { m } from '$lib/paraglide/messages';
	import { localizeHref, setLocale } from '$lib/paraglide/runtime';
</script>

<section class="flex h-[calc(90svh-100px)] w-svw flex-col items-center justify-around bg-gray-100">
	<div class="text-center">
		<h2>{m.slogan(null, { locale: 'zh' })}</h2>
		<h2>{m.slogan(null, { locale: 'en' })}</h2>
	</div>

	<div class="flex gap-4">
		<button
			class="bg-gray-100 px-4 py-2 hover:bg-black hover:text-white"
			onclick={() => setLocale('zh')}>{m.enter(null, { locale: 'zh' })}</button
		>
		<button
			class="bg-gray-100 px-4 py-2 hover:bg-black hover:text-white"
			onclick={() => setLocale('en')}>{m.enter(null, { locale: 'en' })}</button
		>
	</div>
</section>

<style>
</style>
