/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token')
  return !!token
}

/**
 * Get stored auth token
 */
export const getAuthToken = () => {
  return localStorage.getItem('auth_token')
}

/**
 * Remove auth token
 */
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token')
}

/**
 * Check if user has admin role
 */
export const isAdmin = (user) => {
  return user && user.role === 'admin'
}
