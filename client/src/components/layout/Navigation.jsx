import { NavLink } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../../utils/constants'

const Navigation = ({ mobile = false, onItemClick }) => {
  const linkClass = ({ isActive }) => {
    const baseClasses = mobile
      ? 'block py-2 text-base font-medium transition-colors'
      : 'px-3 py-2 text-sm font-medium transition-colors'
    
    return isActive
      ? `${baseClasses} text-primary-600`
      : `${baseClasses} text-gray-700 hover:text-primary-600`
  }

  return (
    <nav className={mobile ? 'pt-4' : ''}>
      <div className={mobile ? 'flex flex-col space-y-1' : 'flex items-center space-x-1'}>
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={linkClass}
            onClick={onItemClick}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
