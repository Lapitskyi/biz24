import axios from 'axios';
import { API_URL } from '@/service/constants';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            headers: { 'Content-Type': 'application/json' }
        });

        this.api.interceptors.response.use(
            response => response.data,
            error => {
                console.error('API error:', error);
                return Promise.reject(error);
            }
        );
    }

    get(url, options = {}) {
        return this.api.get(url, options);
    }
}

export const api = new ApiService();
