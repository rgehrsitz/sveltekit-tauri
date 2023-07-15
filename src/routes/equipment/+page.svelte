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
		equipmentList = await getEquipmentList();
	});

	function selectEquipment(equipment: Equipment): void {
		selectedEquipment = equipment;
	}
</script>

<div class="flex">
	<div class="w-1/3 overflow-auto">
		{#each equipmentList as equipment (equipment.id)}
			<button on:click={() => selectEquipment(equipment)}>
				{equipment.name}
			</button>
		{/each}
	</div>
	<div class="w-2/3">
		{#if selectedEquipment}
			<EquipmentDetail {selectedEquipment} />
		{/if}
	</div>
</div>
