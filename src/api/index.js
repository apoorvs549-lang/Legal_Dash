import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const message = err.response?.data?.error || err.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);

export const fetchAuditLogs = (params) => api.get('/audit-logs', { params });
export const createAuditLog = (data) => api.post('/audit-logs', data);
export const fetchDashboardStats = () => api.get('/dashboard/stats');

export default api;