<!-- src/routes/+page.svelte -->

<script lang="ts">
	// Import any necessary functions or types
	import { getEquipmentList, openEquipmentFile } from '$lib/dataService';

	async function handleOpenFile(): Promise<void> {
		await openEquipmentFile();
		equipmentList = await getEquipmentList();
	}
</script>

<div class="container mx-auto px-4">
	<h1 class="text-4xl font-bold mb-4">Home</h1>

	<div class="grid grid-cols-2 gap-4">
		<div>
			<h2 class="text-2xl font-bold mb-2">File Operations</h2>
			<ul>
				<li><a href="/new">New Configuration</a></li>
				<li><a href="#open">Open Configuration</a></li>
				<li><a href="#clone">Clone Configuration</a></li>
				<li><a href="#recent">Recent Configurations</a></li>
			</ul>
		</div>

		<div>
			<h2 class="text-2xl font-bold mb-2">Other Links</h2>
			<ul>
				<li><a href="#docs">Documentation</a></li>
				<li><a href="#settings">Settings</a></li>
			</ul>
		</div>
	</div>
</div>
