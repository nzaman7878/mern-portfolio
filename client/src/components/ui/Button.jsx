import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false, 
  loading = false,
  ...props 
}, ref) => {
  const baseClasses = 'btn'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  
  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    className
  ].join(' ')
  
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
