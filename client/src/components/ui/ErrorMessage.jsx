import { AlertCircle, RefreshCw } from 'lucide-react'
import Button from './Button'

const ErrorMessage = ({ 
  error = 'An error occurred',
  onRetry = null,
  className = ''
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{error}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="inline-flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage
