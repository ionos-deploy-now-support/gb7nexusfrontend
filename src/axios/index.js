import axios from 'axios';
import { baseBackendUrl } from '../config/index';

export const axiosInstanceWithoutAuth = axios.create({
    baseURL: baseBackendUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const axiosInstanceWithAuth = axios.create({
    baseURL: baseBackendUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
