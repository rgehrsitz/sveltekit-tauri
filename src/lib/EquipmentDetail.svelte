<!-- src/lib/EquipmentDetail.svelte -->

<script lang="ts">
	import type { Equipment } from '$lib/dataService';

	export let selectedEquipment: Equipment;
</script>

<h2>{selectedEquipment.name}</h2>
<p>Type: {selectedEquipment.type}</p>
<p>Parent: {selectedEquipment.parent}</p>
<p>Firmware Version: {selectedEquipment.details.firmwareVersion}</p>
<!-- Display other details as needed -->

<button>Edit</button>
<button>Delete</button>
