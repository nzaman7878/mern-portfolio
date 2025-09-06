import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Send, CheckCircle } from 'lucide-react'
import FormField from '../forms/FormField'
import FormTextarea from '../forms/FormTextarea'
import Button from '../ui/Button'
import { useContact } from '../../hooks/useContact'

const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please provide a valid email address'),
  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(150, 'Subject cannot exceed 150 characters'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
  phone: yup
    .string()
    .optional(),
  company: yup
    .string()
    .optional()
    .max(100, 'Company name cannot exceed 100 characters')
})

const ContactForm = () => {
  const { loading, success, submitMessage } = useContact()
  const [serverErrors, setServerErrors] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(contactSchema)
  })

  const messageLength = watch('message')?.length || 0

  const onSubmit = async (data) => {
    setServerErrors({})
    
    const result = await submitMessage(data)
    
    if (result.success) {
      reset()
    } else if (result.errors) {
      // Handle validation errors from server
      const errorObj = {}
      result.errors.forEach(err => {
        errorObj[err.field] = err.message
      })
      setServerErrors(errorObj)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for reaching out. I'll get back to you within 24-48 hours.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field (hidden from users, visible to bots) */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <input
          type="text"
          name="website"
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Name"
          error={errors.name?.message || serverErrors.name}
          required
        >
          <input
            {...register('name')}
            type="text"
            placeholder="Your full name"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.name || serverErrors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </FormField>

        <FormField
          label="Email"
          error={errors.email?.message || serverErrors.email}
          required
        >
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.email || serverErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Phone (Optional)"
          error={errors.phone?.message || serverErrors.phone}
        >
          <input
            {...register('phone')}
            type="tel"
            placeholder="+1 (555) 123-4567"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.phone || serverErrors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </FormField>

        <FormField
          label="Company (Optional)"
          error={errors.company?.message || serverErrors.company}
        >
          <input
            {...register('company')}
            type="text"
            placeholder="Your company name"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.company || serverErrors.company ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </FormField>
      </div>

      <FormField
        label="Subject"
        error={errors.subject?.message || serverErrors.subject}
        required
      >
        <input
          {...register('subject')}
          type="text"
          placeholder="What's this about?"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.subject || serverErrors.subject ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </FormField>

      <FormTextarea
        label="Message"
        error={errors.message?.message || serverErrors.message}
        required
        rows={6}
      >
        <div className="relative">
          <textarea
            {...register('message')}
            rows={6}
            placeholder="Tell me about your project, ask a question, or just say hello!"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
              errors.message || serverErrors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {messageLength}/2000
          </div>
        </div>
      </FormTextarea>

      <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
        <p className="mb-2">📧 <strong>Response time:</strong> Usually within 24-48 hours</p>
        <p>🔒 <strong>Privacy:</strong> Your information is secure and will never be shared</p>
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full inline-flex items-center justify-center"
        size="lg"
      >
        <Send className="h-4 w-4 mr-2" />
        Send Message
      </Button>
    </form>
  )
}

export default ContactForm
