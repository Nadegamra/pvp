import axios from 'axios';
import { UserLogin, UserRegister } from '../models/User';

const api = axios.create({
    baseURL: 'https://localhost:44351/Auth/'
});

const headers = {
    withCredentials: true
};

export async function login(loginCredentials: UserLogin) {
    return api.post(`login`, loginCredentials, headers);
}

export async function register(registerCredentials: UserRegister) {
    return api.post(`register`, registerCredentials, headers);
}

export async function logout() {
    return api.post(`logout`, null, headers);
}

export async function getProfile() {
    return api.get(`getProfile`, headers);
}
