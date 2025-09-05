import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FolderOpen, 
  Zap, 
  ChartLine,    
  MessageSquare,
  X
} from 'lucide-react'

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Projects',  href: '/admin/projects', icon: FolderOpen },
  { name: 'Skills',    href: '/admin/skills', icon: Zap },
  { name: 'Timeline',  href: '/admin/timeline', icon: ChartLine },  
  { name: 'Messages',  href: '/admin/messages', icon: MessageSquare }
]

  const isActive = (href, exact = false) => {
    if (exact) return location.pathname === href
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            aria-label="Close sidebar"
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href, item.exact)
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${active 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </NavLink>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}

export default AdminSidebar
