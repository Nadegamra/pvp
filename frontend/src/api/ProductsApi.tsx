import axios from 'axios';
import { ProductAdd, ProductAddUnits, ProductImageAdd, ProductUpdate } from '../models/Product';

const api = axios.create({
    baseURL: 'https://localhost:44351/Products/'
});

const headers = {
    withCredentials: true
};

export async function getById(id: number) {
    return api.get(`get/id?id=${id}`, headers);
}

export async function getByIdDetailed(id: number) {
    return api.get(`get/id/details?id=${id}`, headers);
}

export async function getByCategory(id: number) {
    return api.get(`get/category?id=${id}`, headers);
}

export async function getByManufacturer(id: number) {
    return api.get(`get/manufacturer?id=${id}`, headers);
}

export async function addProduct(product: ProductAdd) {
    return api.post(`add`, product, headers);
}

export async function addUnits(info: ProductAddUnits) {
    return api.post(`addUnits`, info, headers);
}

export async function updateProduct(product: ProductUpdate) {
    return api.patch(`update`, product, headers);
}

export async function removeProduct(id: number) {
    return api.delete(`remove?id=${id}`, headers);
}

export async function addImage(image: ProductImageAdd) {
    return api.post(`images/add`, image, headers);
}

export async function removeImage(id: number) {
    return api.delete(`images/remove?id=${id}`, headers);
}