/**
 * lib/api.js
 * Konfigurasi Axios dan semua fungsi API call ke backend
 */
import axios from 'axios'

/** Base Axios instance */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Request Interceptor — Attach JWT token jika ada ─────────────────────────
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

// ─── Response Interceptor — Handle error 401 dan extract response.data ────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }
    const message = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
    return Promise.reject(new Error(message))
  }
)

export default api

// ─── Donation API ─────────────────────────────────────────────────────────────
export const donationApi = {
  /** Statistik donasi publik */
  getStats: () => api.get('/donations/stats'),
  /** Submit donasi baru */
  create: (payload) => api.post('/donations', payload),
  /** Admin: list semua donasi */
  getAll: (params) => api.get('/admin/donations', { params }),
  /** Admin: update status donasi */
  updateStatus: (id, status) => api.patch(`/admin/donations/${id}/status`, { status }),
}

// ─── Activity API ─────────────────────────────────────────────────────────────
export const activityApi = {
  /** List kegiatan dengan filter dan pagination */
  getAll: (params) => api.get('/activities', { params }),
  /** Detail kegiatan berdasarkan ID */
  getById: (id) => api.get(`/activities/${id}`),
}

// ─── Report API ───────────────────────────────────────────────────────────────
export const reportApi = {
  /** List laporan keuangan */
  getAll: (params) => api.get('/reports', { params }),
  /** Ringkasan per bulan untuk chart */
  getSummary: (params) => api.get('/reports/summary', { params }),
}

// ─── Contact API ──────────────────────────────────────────────────────────────
export const contactApi = {
  /** Kirim pesan kontak */
  send: (payload) => api.post('/contact', payload),
}

// ─── Admin Auth API ───────────────────────────────────────────────────────────
export const adminApi = {
  /** Login admin */
  login: (data) => api.post('/admin/login', data),
  /** Data admin yang sedang login */
  getMe: () => api.get('/admin/me'),
}
