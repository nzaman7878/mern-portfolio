import { AlertCircle, RefreshCw, Home, Wifi } from 'lucide-react'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

const ServerError = ({ error, onRetry }) => {
  const isNetworkError = error?.message?.toLowerCase().includes('network') || 
                        error?.code === 'NETWORK_ERROR' ||
                        error?.name === 'NetworkError'
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          {isNetworkError ? (
            <Wifi className="h-20 w-20 text-orange-500 mx-auto mb-6" />
          ) : (
            <AlertCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {isNetworkError ? 'Connection Problem' : 'Server Error'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isNetworkError 
              ? 'Unable to connect to the server. Please check your internet connection and try again.'
              : 'We\'re experiencing some technical difficulties. Please try again in a moment.'
            }
          </p>
          
          {error?.message && (
            <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg mb-6 text-left">
              <strong>Error Details:</strong> {error.message}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="primary"
                className="inline-flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            
            <Button
              as={Link}
              to="/"
              variant="outline"
              className="inline-flex items-center justify-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If this problem continues, please{' '}
              <Link 
                to="/contact" 
                className="text-primary-600 hover:text-primary-700 underline"
              >
                contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerError
