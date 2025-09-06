import { useState } from 'react'
import { contactService } from '../services/contactService'
import toast from 'react-hot-toast'

export const useContact = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const submitMessage = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      // Client-side validation
      const validation = contactService.validateForm(formData)
      if (!validation.isValid) {
        setError('Please check your form data')
        return { success: false, errors: validation.errors }
      }

      // Submit to API
      const response = await contactService.submitMessage(formData)
      
      setSuccess(true)
      toast.success(response.message || 'Message sent successfully!')
      
      return { success: true, data: response }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send message'
      setError(errorMessage)
      toast.error(errorMessage)
      
      return { 
        success: false, 
        error: errorMessage,
        errors: err.response?.data?.errors || []
      }
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setSuccess(false)
    setError(null)
  }

  return {
    loading,
    success,
    error,
    submitMessage,
    reset
  }
}
