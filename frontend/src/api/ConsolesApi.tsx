import axios from 'axios'
import { ConsoleAdd, ConsoleUpdate } from '../models/Console'

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
    return api.get(`get?id=${id}`, headers)
}

export async function addConsole(consoleDto: ConsoleAdd) {
    return api.post(`add`, consoleDto, headers)
}

export async function updateConsole(consoleDto: ConsoleUpdate) {
    return api.put(`update`, consoleDto, headers)
}

export async function removeConsole(id: number) {
    return api.delete(`remove?id=${id}`,headers)
}