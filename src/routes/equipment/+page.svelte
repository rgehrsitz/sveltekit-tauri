<!-- src/routes/equipment/+page.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { getEquipmentList } from '$lib/dataService';
	import type { Equipment } from '$lib/dataService';
	import EquipmentList from '$lib/EquipmentList.svelte';
	import EquipmentDetail from '$lib/EquipmentDetail.svelte';

	let equipmentList: Equipment[] = [];
	let selectedEquipment: Equipment | null = null;

	onMount(async () => {
		equipmentList = getEquipmentList();
	});

	function selectEquipment(equipment: Equipment): void {
		selectedEquipment = equipment;
	}
</script>

<EquipmentList {equipmentList} {selectEquipment} />

{#if selectedEquipment}
	<EquipmentDetail {selectedEquipment} />
{/if}
