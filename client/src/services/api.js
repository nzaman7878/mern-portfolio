import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token')
      // Only redirect if we're in admin routes
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }
    
    // Network error
    if (error.code === 'NETWORK_ERROR' || !error.response) {
      error.message = 'Network error. Please check your connection.'
    }
    
    // Timeout error
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please try again.'
    }
    
    return Promise.reject(error)
  }
)

// API helper functions
export const apiRequest = async (config) => {
  try {
    const response = await api(config)
    return response.data
  } catch (error) {
    throw error
  }
}

// HTTP methods
export const apiGet = (url, config = {}) => apiRequest({ method: 'GET', url, ...config })
export const apiPost = (url, data, config = {}) => apiRequest({ method: 'POST', url, data, ...config })
export const apiPut = (url, data, config = {}) => apiRequest({ method: 'PUT', url, data, ...config })
export const apiDelete = (url, config = {}) => apiRequest({ method: 'DELETE', url, ...config })

export default api
