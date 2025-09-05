import { Menu, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Button from '../ui/Button'

const AdminHeader = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Title - Desktop only */}
        <div className="hidden md:block">
          <h2 className="text-lg font-semibold text-gray-900">
            Portfolio Admin
          </h2>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-700">
              {user?.fullName || user?.username}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="inline-flex items-center text-red-600 hover:text-red-700"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
