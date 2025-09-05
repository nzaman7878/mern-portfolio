import { forwardRef } from 'react'

const FormCheckbox = forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          {...props}
        />
        {label && (
          <label className="ml-2 text-sm text-gray-700">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
})

FormCheckbox.displayName = 'FormCheckbox'

export default FormCheckbox
