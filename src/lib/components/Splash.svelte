<script>
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<section class="flex h-svh w-svw flex-col items-center justify-around">
	<div class="text-center">
		<h1>{m.title(null, { locale: 'zh' })}</h1>
		<h1>{m.title(null, { locale: 'zh_py' })}</h1>
		<h1>{m.title(null, { locale: 'en' })}</h1>
	</div>

	<div class="flex gap-4">
		<a
			href={localizeHref('items', { locale: 'zh' })}
			class="bg-gray-100 px-4 py-2 hover:bg-black hover:text-white"
			>{m.enter(null, { locale: 'zh' })}</a
		>
		<a
			href={localizeHref('items', { locale: 'en' })}
			class="bg-gray-100 px-4 py-2 hover:bg-black hover:text-white"
			>{m.enter(null, { locale: 'en' })}</a
		>
	</div>
</section>

<style>
</style>
