<script>
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	let { value = $bindable('all'), options = ['all', 'object', 'creator'] } = $props();
	let lang = $derived(getLocale());
	function labelFor(opt) {
		if (opt === 'all') return m.all(null, { locale: lang });
		if (opt === 'object') return m.objects(null, { locale: lang });
		if (opt === 'creator') return m.creators(null, { locale: lang });
		return opt;
	}
	function select(opt) {
		value = opt;
	}
</script>

<div class="flex justify-end gap-2">
	{#each options as opt}
		<button
			class="cursor-pointer px-2 py-1 text-sm {value === opt
				? 'bg-black text-white'
				: 'bg-gray-200 hover:bg-gray-300'}"
			onclick={() => select(opt)}
		>
			{labelFor(opt)}
		</button>
	{/each}
</div>
