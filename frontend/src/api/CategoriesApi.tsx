import axios from 'axios';
import { CategoryAdd, CategoryUpdate } from '../models/Category';

const api = axios.create({
    baseURL: 'https://localhost:44351/Categories/'
});

const headers = {
    withCredentials: true
};

export async function getCategories() {
    return api.get('getAll', headers);
}

export async function getCategory(id: number) {
    return api.get(`get?id=${id}`, headers);
}

export async function addCategory(category: CategoryAdd) {
    return api.post('add', category, headers);
}

export async function removeCategory(id: number) {
    return api.delete(`remove?id=${id}`, headers);
}

export async function updateCategory(category: CategoryUpdate) {
    return api.patch('update', category, headers);
}