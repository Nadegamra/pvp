import axios from 'axios';
import { ManufacturerAdd, ManufacturerUpdate } from '../models/Manufacturer';

const api = axios.create({
    baseURL: 'https://localhost:44351/Manufacturers/'
});

const headers = {
    withCredentials: true
};

export async function getManufacturers() {
    return api.get('getAll', headers);
}

export async function getManufacturer(id: number) {
    return api.get(`get?id=${id}`, headers);
}

export async function addManufacturer(manufacturer: ManufacturerAdd) {
    return api.post('add', manufacturer, headers);
}

export async function updateManufacturer(manufacturer: ManufacturerUpdate) {
    return api.patch(`update`, manufacturer, headers);
}

export async function removeManufacturer(id: number) {
    return api.delete(`remove?id=${id}`, headers);
}