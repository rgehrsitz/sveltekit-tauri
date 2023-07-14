<script>
	import '../app.postcss';
	import Header from '$lib/Header.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div id="app" class="flex flex-col h-screen">
	<Header />

	<div id="main" class="flex flex-grow">
		<Sidebar />
		<section class="flex-grow">
			<slot />
		</section>
	</div>

	<Footer />
</div>
