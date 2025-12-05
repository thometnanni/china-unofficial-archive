<script>
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	const { objectCount, creatorCount } = $props();

	// import { getLocale } from '$lib/paraglide/runtime';
	// let { value = $bindable('all'), options = ['all', 'object', 'creator'] } = $props();
	// let lang = $derived(getLocale());
	// function labelFor(opt) {
	// 	if (opt === 'all') return m.all(null, { locale: lang });
	// 	if (opt === 'object') return m.objects(null, { locale: lang });
	// 	if (opt === 'creator') return m.creators(null, { locale: lang });
	// 	return opt;
	// }
	// function select(opt) {
	// 	value = opt;
	// }

	let currentView = $derived($page.url.searchParams.get('view') || 'object');

	function setView(view) {
		const url = new URL($page.url);
		url.searchParams.set('view', view);
		goto(url, {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	}
</script>

<div class="m-2 flex justify-center gap-1">
	<button
		class="custom-outline {currentView === 'object' ? 'is-active' : ''}"
		onclick={() => setView('object')}
	>
		{m.objects()} ({objectCount})
	</button>
	<button
		class="custom-outline {currentView === 'creator' ? 'is-active' : ''}"
		onclick={() => setView('creator')}
	>
		{m.creators()} ({creatorCount})
	</button>
</div>

<style>
	@reference "../../app.css";

	button {
		@apply cursor-pointer border border-brand bg-white px-1;

		&.is-active,
		&:hover {
			@apply border-white bg-brand text-white;
		}

		&.is-active {
			@apply cursor-default;
		}
	}
</style>
