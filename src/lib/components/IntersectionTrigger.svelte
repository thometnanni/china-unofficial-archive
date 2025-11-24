<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';

	const dispatch = createEventDispatcher();
	let element;
	let observer;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					dispatch('visible');
				}
			},
			{
				root: null, // viewport
				rootMargin: '0px',
				threshold: 0.1 // trigger if 10% is visible
			}
		);

		if (element) observer.observe(element);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div bind:this={element} class="mb-4 text-center">
	<Loading />
</div>
