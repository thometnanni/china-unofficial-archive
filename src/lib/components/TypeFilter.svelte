<script>
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
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
		goto(url, { replaceState: true });
	}
</script>

<div class="flex justify-end gap-2">
	<button
		class="cursor-pointer px-2 py-1 text-sm {currentView === 'object'
			? 'bg-black text-white'
			: 'bg-gray-200 hover:bg-gray-300'}"
		onclick={() => setView('object')}
	>
		{m.objects()}
	</button>
	<button
		class="cursor-pointer px-2 py-1 text-sm {currentView === 'creator'
			? 'bg-black text-white'
			: 'bg-gray-200 hover:bg-gray-300'}"
		onclick={() => setView('creator')}
	>
		{m.creators()}
	</button>
</div>
