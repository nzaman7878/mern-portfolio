import { apiPost } from './api'

export const contactService = {
  // Submit contact form
  submitMessage: async (formData) => {
    return apiPost('/contact', {
      ...formData,
      // Add honeypot field (should be empty)
      website: ''
    })
  },

  // Validate email (client-side check)
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Check if form data is valid
  validateForm: (data) => {
    const errors = {}

    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long'
    }

    if (!data.email || !contactService.validateEmail(data.email)) {
      errors.email = 'Please provide a valid email address'
    }

    if (!data.subject || data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long'
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}
