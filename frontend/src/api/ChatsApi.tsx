import axios from 'axios'
import { MessageAdd } from '../models/Message'

const api = axios.create({
    baseURL: 'https://localhost:44351/Chats/'
})

const headers = {
    withCredentials: true
}

export async function getAllConversations() {
    return api.get(`getAll/admin`, headers)
}

export async function getLenderConversations() {
    return api.get(`getAll/lender`, headers)
}

export async function getBorrowerConversations() {
    return api.get(`getAll/borrower`, headers)
}

export async function getConversation(userConsoleId: number) {
    return api.get(`get/${userConsoleId}`, headers)
}

export async function contactLender(userConsoleId: number) {
    return api.post(`contact/lender/${userConsoleId}`, null, headers)
}

export async function contactBorrower(borrowingId: number) {
    return api.post(`contact/borrower/${borrowingId}`, null, headers)
}

export async function sendMessage(data: MessageAdd) {
    return api.post(`message`, data, headers)
}
