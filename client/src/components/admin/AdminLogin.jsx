import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Lock, User, AlertCircle } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import { loginSchema } from '../../utils/validation'
import FormField from '../../components/forms/FormField'
import Button from '../../components/ui/Button'
import SEO from '../../components/ui/SEO'

const AdminLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, loading, error, clearError } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/admin'

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    // Clear any previous errors when component mounts
    clearError()
  }, [clearError])

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      await login(data)
      // Navigation will happen via useEffect above
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title="Admin Login" 
        description="Login to the admin panel to manage your portfolio content."
        noIndex
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-primary-100 p-3 rounded-full">
                <Lock className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage your portfolio content
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <FormField
                label="Username"
                error={errors.username?.message}
                required
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('username')}
                    type="text"
                    placeholder="Enter your username"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
              </FormField>

              <FormField
                label="Password"
                error={errors.password?.message}
                required
              >
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
              </FormField>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Portfolio Admin Panel</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
