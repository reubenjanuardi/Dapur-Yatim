import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — global error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
    return Promise.reject(new Error(message))
  }
)

export default api

// API helper functions
export const donationApi = {
  getStats: () => api.get('/donations/stats'),
  create: (payload) => api.post('/donations', payload),
}

export const activityApi = {
  getAll: (params) => api.get('/activities', { params }),
  getById: (id) => api.get(`/activities/${id}`),
}

export const reportApi = {
  getAll: (params) => api.get('/reports', { params }),
}

export const contactApi = {
  send: (payload) => api.post('/contact', payload),
}
