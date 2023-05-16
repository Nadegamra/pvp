import axios from 'axios'
import { BorrowingAdd, BorrowingUpdate, BorrowingUpdateStatus } from '../models/Borrowing'

const api = axios.create({
    baseURL: 'https://localhost:44351/Borrowings/'
})

const headers = {
    withCredentials: true
}

export async function getAllBorrowings() {
    return api.get(`all`, headers)
}

export async function getBorrowingsByUser() {
    return api.get(`user`, headers)
}

export async function getBorrowingById(id: number) {
    return api.get(`${id}`, headers)
}

export async function addBorrowing(data: BorrowingAdd) {
    return api.post(`add`, data, headers)
}

export async function updateBorrowing(data: BorrowingUpdate) {
    return api.patch(`update`, data, headers)
}

export async function updateBorrowingStatus(data: BorrowingUpdateStatus) {
    return api.patch(`status`, data, headers)
}

export async function deleteBorrowing(id: number) {
    return api.delete(`${id}`, headers)
}
