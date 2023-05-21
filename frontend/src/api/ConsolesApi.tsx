import axios from 'axios'
import { ConsoleAdd, ConsoleUpdate } from '../models/Console'
import { ImageAdd } from '../models/Image'

const api = axios.create({
    baseURL: 'https://localhost:44351/Consoles/'
})

const headers = {
    withCredentials: true
}

export async function getConsoles() {
    return api.get(`getAll`, headers)
}

export async function getConsole(id: number) {
    return api.get(`get/${id}`, headers)
}

export async function addConsole(consoleDto: ConsoleAdd) {
    return api.post(`add`, consoleDto, headers)
}

export async function updateConsole(consoleDto: ConsoleUpdate) {
    return api.put(`update`, consoleDto, headers)
}

export async function canDeleteConsole(id: number) {
    return api.get(`canDelete/${id}`, headers)
}

export async function removeConsole(id: number) {
    return api.delete(`remove/${id}`, headers)
}

export async function addImage(imageDto: ImageAdd) {
    return api.post(`images/add`, imageDto, headers)
}

export async function removeImage(id: number) {
    return api.delete(`images/delete/${id}`, headers)
}
