const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = true,
  ...props 
}) => {
  const classes = [
    'card',
    hover ? 'hover:shadow-lg' : '',
    padding ? '' : '!p-0',
    className
  ].join(' ')
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
