import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44351/Files/'
});

export async function download(fileName: string) {
    window.location.href = `${'https://localhost:44351/Files/'}download?fileName=${fileName}`;
}

export async function downloadFile(fileName: string) {
    return api.get(`download?fileName=${fileName}`, { responseType: 'blob' });
}

export async function upload(file: File, fileName: string) {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`upload?name=${fileName}`, formData);
}

export async function deleteFile(fileName: string) {
    return api.get(`delete/${fileName}`);
}