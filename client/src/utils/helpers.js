/**
 * Format date to readable string
 * @param {string|Date} date 
 * @param {Object} options 
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

/**
 * Format date range
 * @param {string|Date} startDate 
 * @param {string|Date} endDate 
 * @returns {string}
 */
export const formatDateRange = (startDate, endDate) => {
  const start = formatDate(startDate, { year: 'numeric', month: 'short' })
  
  if (!endDate) return `${start} - Present`
  
  const end = formatDate(endDate, { year: 'numeric', month: 'short' })
  return `${start} - ${end}`
}

/**
 * Truncate text to specified length
 * @param {string} text 
 * @param {number} length 
 * @returns {string}
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

/**
 * Generate excerpt from content
 * @param {string} content 
 * @param {number} wordCount 
 * @returns {string}
 */
export const generateExcerpt = (content, wordCount = 30) => {
  const words = content.split(' ')
  if (words.length <= wordCount) return content
  return words.slice(0, wordCount).join(' ') + '...'
}

/**
 * Debounce function
 * @param {Function} func 
 * @param {number} delay 
 * @returns {Function}
 */
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

/**
 * Check if email is valid
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Scroll to element smoothly
 * @param {string} elementId 
 * @param {number} offset 
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/**
 * Get project category display name
 * @param {string} category 
 * @returns {string}
 */
export const getProjectCategoryName = (category) => {
  const categories = {
    web: 'Web App',
    mobile: 'Mobile App',
    desktop: 'Desktop App',
    api: 'API/Backend',
    other: 'Other'
  }
  return categories[category] || category
}

/**
 * Get status color classes
 * @param {string} status 
 * @returns {string}
 */
export const getStatusColor = (status) => {
  const colors = {
    planning: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    'on-hold': 'bg-gray-100 text-gray-800'
  }
  return colors[status] || colors.completed
}

/**
 * Calculate reading time for content
 * @param {string} content 
 * @param {number} wordsPerMinute 
 * @returns {number}
 */
export const calculateReadingTime = (content, wordsPerMinute = 200) => {
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Parse URL parameters
 * @param {string} search 
 * @returns {Object}
 */
export const parseUrlParams = (search) => {
  const params = new URLSearchParams(search)
  const result = {}
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  return result
}
