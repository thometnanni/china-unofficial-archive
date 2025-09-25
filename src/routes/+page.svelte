<script>
	import Featured from '$lib/components/Featured.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Splash from '$lib/components/Splash.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Splash />
<MenuBar />

<!-- <svelte:boundary> -->
<Featured />
<!-- {#snippet pending()}
		<section class="h-200">
			<p>Loading...</p>
		</section>
	{/snippet}
</svelte:boundary> -->

<Footer />
