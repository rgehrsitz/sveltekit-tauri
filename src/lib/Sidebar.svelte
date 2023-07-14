<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	$: activeUrl = $page.url.pathname;
</script>

<Sidebar>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="Welcome" href="/" active={activeUrl === '/'} />
			<SidebarItem label="Equipment" href="/equipment" active={activeUrl === '/equipment'} />
			<SidebarItem label="Snapshot" href="/snapshot" active={activeUrl === '/snapshot'} />
			<SidebarItem label="Diff" href="/diff" active={activeUrl === '/diff'} />
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
