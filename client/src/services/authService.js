import { apiPost, apiGet } from './api'

export const authService = {
  // Login user
  login: async (credentials) => {
    return apiPost('/auth/login', credentials)
  },

  // Verify current token
  verifyToken: async () => {
    return apiPost('/auth/verify-token')
  },

  // Get current user info
  getCurrentUser: async () => {
    return apiGet('/auth/me')
  },

  // Logout (client-side only for now)
  logout: () => {
    localStorage.removeItem('auth_token')
  }
}
