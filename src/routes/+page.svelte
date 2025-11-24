<script>
	import Featured from '$lib/components/Featured.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Splash from '$lib/components/Splash.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
	title="China Unofficial Archives"
	description="The only non-profit archive of independent Chinese thought"
	image="/cover.png"
/>

<MenuBar />

<Splash />

<div class="relative z-200 mt-[-160px]">
	<Featured />
</div>
<Footer />
