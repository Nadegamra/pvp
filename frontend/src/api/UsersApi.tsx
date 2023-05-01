import axios from 'axios'
import { UserEmailChange, UserPasswordChange, UserPasswordReset } from '../models/User'

const api = axios.create({
    baseURL: 'https://localhost:44351/Users/'
})

const headers = {
    withCredentials: true
}

export async function getAllUsers(rolename?: string) {
    return api.get(`admin/getAll?${rolename != undefined ? `roleName=${rolename}` : ''}`, headers)
}

export async function confirmEmail(token: string) {
    return api.post(`confirmEmail`, { token: token }, headers)
}

export async function sendPasswordResetEmail(email: string) {
    return api.post(`passwordReset/send`, email, headers)
}

export async function resetPassword(data: UserPasswordReset) {
    return api.post(`passwordReset/change`, data, headers)
}

export async function changePassword(data: UserPasswordChange) {
    return api.post(`account/changePassword`, data, headers)
}

export async function sendEmailChangeToken(data: UserEmailChange) {
    return api.post(`changeEmail/send`, data, headers)
}

export async function getUnconfirmedEmails() {
    return api.get(`changeEmail/getUnconfirmed`, headers)
}

export async function changeEmail(token: string) {
    return api.post(`changeEmail/change`, { token: token }, headers)
}
