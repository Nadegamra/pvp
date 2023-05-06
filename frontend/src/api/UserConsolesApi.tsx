import axios from 'axios'
import { UserConsoleAdd, UserConsoleStatusUpdate, UserConsoleUpdate } from '../models/UserConsole'
import { ImageAdd } from '../models/Image'

const api = axios.create({
    baseURL: 'https://localhost:44351/UserConsoles/'
})

const headers = {
    withCredentials: true
}

export async function getUserConsoles() {
    return api.get(`get`, headers)
}

export async function getUserConsole(id: number) {
    return api.get(`get/${id}`, headers)
}

export async function addUserConsole(data: UserConsoleAdd) {
    return api.post(`add`, data, headers)
}

export async function updateUserConsole(data: UserConsoleUpdate) {
    return api.put(`update`, data, headers)
}

export async function deleteUserConsole(id: number) {
    return api.delete(`remove/${id}`, headers)
}

export async function addImage(imageDto: ImageAdd) {
    return api.post(`images/add`, imageDto, headers)
}

export async function removeImage(id: number) {
    return api.delete(`images/delete?id=${id}`, headers)
}

export async function updateUserConsoleStatus(data: UserConsoleStatusUpdate) {
    return api.patch(`updateStatus`, data, headers)
}
