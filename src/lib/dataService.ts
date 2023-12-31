// src/lib/dataService.ts
import { v4 as uuidv4 } from 'uuid';
import { dialog, fs } from '@tauri-apps/api';

export interface EquipmentDetails {
    firmwareVersion?: string;
    // Add other details as needed
}

export interface Equipment {
    id: string;
    name: string;
    type: string;
    description: string;
    children: Equipment[];
    properties: Record<string, unknown>;
    createdAt: number;  // Add this line
    updatedAt: number;  // Add this line
}


export function getEquipmentList (): Equipment[] {
    if (!Array.isArray(equipmentList)) {
        return [];
    }

    return [...equipmentList];
}

interface Snapshot {
    id: number;
    timestamp: number;
    configuration: Equipment[];
}

let snapshotId = 0;

export let equipmentList: Equipment[] = [];
const snapshotList: Snapshot[] = [];

export async function openEquipmentFile (): Promise<void> {
    const options = {
        filters: [
            { name: 'JSON', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    };
    const filePaths = await dialog.open(options);
    if (typeof filePaths === 'string') {
        // If filePaths is a string, use it directly
        console.log('Opening file:', filePaths);
        const fileContents = await fs.readTextFile(filePaths);
        const equipmentData = JSON.parse(fileContents);
        equipmentList = equipmentData;
    } else if (Array.isArray(filePaths) && filePaths.length > 0) {
        // If filePaths is an array, use the first element
        console.log('Opening file:', filePaths[0]);
        const fileContents = await fs.readTextFile(filePaths[0]);
        const equipmentData = JSON.parse(fileContents);
        equipmentList = equipmentData;
    }
    console.log('Equipment list:', equipmentList);
}



export async function saveEquipmentToFile (equipment: Equipment) {
    const options = {
        defaultPath: 'filename1.json',
        filters: [
            { name: 'JSON', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    };
    const savePath = await dialog.save(options);
    if (savePath !== null) {
        await fs.writeFile({
            path: savePath,
            contents: JSON.stringify(equipment, null, 2)
        });
    }
}

export async function addEquipment (equipment: Equipment): Promise<void> {
    equipmentList.push(equipment);
    await saveEquipmentToFile(equipment);
}

export function createEquipment (name: string, type: string, description: string, children: Equipment[] = [], properties: Record<string, unknown> = {}): Equipment {
    const timestamp = Date.now();
    const equipment: Equipment = { id: uuidv4(), name, type, description, children, properties, createdAt: timestamp, updatedAt: timestamp };
    equipmentList.push(equipment);
    return equipment;
}

export function getEquipment (id: string): Equipment | undefined {
    return equipmentList.find(equipment => equipment.id === id);
}



export function updateEquipment (id: string, name: string, type: string, description: string, children: Equipment[] = [], properties: Record<string, unknown> = {}): Equipment | undefined {
    const equipment = getEquipment(id);
    if (equipment) {
        equipment.name = name;
        equipment.type = type;
        equipment.description = description;
        equipment.children = children;
        equipment.properties = properties;
        equipment.updatedAt = Date.now();  // Add this line
    }
    return equipment;
}

export function deleteEquipment (id: string): void {
    const index = equipmentList.findIndex(equipment => equipment.id === id);
    if (index !== -1) {
        equipmentList.splice(index, 1);
    }
}

export function createSnapshot (): Snapshot {
    const snapshot: Snapshot = { id: snapshotId++, timestamp: Date.now(), configuration: [...equipmentList] };
    snapshotList.push(snapshot);
    return snapshot;
}

export function getSnapshot (id: number): Snapshot | undefined {
    return snapshotList.find(snapshot => snapshot.id === id);
}

export function getSnapshots (): Snapshot[] {
    return [...snapshotList];
}
