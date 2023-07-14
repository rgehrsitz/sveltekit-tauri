<!-- src/routes/equipment.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { getEquipmentList } from '$lib/dataService';
	import EquipmentList from '$lib/EquipmentList.svelte';
	import EquipmentDetail from '$lib/EquipmentDetail.svelte';

	let equipmentList = [];

	onMount(async () => {
		// Fetch the equipment list when the component mounts
		equipmentList = getEquipmentList();
	});

	// Add functions to handle user interactions (e.g., creating, updating, and deleting equipment)
</script>

<!-- Add your HTML and CSS here -->
<h1>about</h1>
<p>this is the equipment page.</p>
<EquipmentList />
<EquipmentDetail />
