<script>
	// Add your header logic here
	import { DarkMode } from 'flowbite-svelte';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-2 top-12  md:top-3 md:right-2 z-50';
</script>

<header class="p-4 bg-blue-500 text-white">
	<!-- Add your header content here -->
	<h1>Rack Track</h1>
	<DarkMode btnClass={darkmodebtn} />
</header>
