<script>
	import Meta from '$lib/components/Meta.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Archive from '$lib/components/Archive.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Meta
	title="China Unofficial Archives"
	description="The only non-profit archive of independent Chinese thought"
	image="/cover.png"
/>

<MenuBar />
<Hero />

<svelte:boundary>
	<Archive />
	{#snippet pending()}
		<Loading />
	{/snippet}
</svelte:boundary>
<Footer />
