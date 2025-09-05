import { FileX, Search, Plus } from 'lucide-react'
import Button from './Button'

const EmptyState = ({ 
  icon: Icon = FileX,
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  action = null,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  )
}

export default EmptyState
