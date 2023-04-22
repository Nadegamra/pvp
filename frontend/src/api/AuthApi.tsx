import axios from 'axios'
import { UserLogin, RegisterPhysical, RegisterLegal, RegisterRequestApproval } from '../models/User'

const api = axios.create({
    baseURL: 'https://localhost:44351/Auth/'
})

const headers = {
    withCredentials: true
}

export async function login(loginCredentials: UserLogin) {
    return api.post(`login`, loginCredentials, headers)
}

export async function logout() {
    return api.post(`logout`, null, headers)
}

export async function getProfile() {
    return api.get(`profile`, headers)
}

export async function registerLenderPhysical(registerCredentials: RegisterPhysical) {
    return api.post(`register/lender/physical`, registerCredentials, headers)
}

export async function registerLenderLegal(registerCredentials: RegisterLegal) {
    return api.post(`register/lender/legal`, registerCredentials, headers)
}

export async function submitRegisterRequest(registerCredentials: RegisterLegal) {
    return api.post(`register/borrower/request`, registerCredentials, headers)
}

export async function getRegisterRequests() {
    return api.get(`register/borrower/getAll`, headers)
}

export async function approveRegistrationRequest(approval: RegisterRequestApproval) {
    return api.post(`register/borrower/confirm`, approval, headers)
}
