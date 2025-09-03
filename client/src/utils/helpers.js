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
