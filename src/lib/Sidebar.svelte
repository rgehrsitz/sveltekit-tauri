<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	$: activeUrl = $page.url.pathname;
</script>

<Sidebar>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="Dashboard" href="/" active={activeUrl === '/'} />
			<SidebarItem label="Sidebar" href="/about" active={activeUrl === '/about'} />
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
