import { Link, useLocation } from 'react-router-dom'
import { Home, ArrowLeft, Search, MapPin } from 'lucide-react'
import SEO from '../ui/SEO'
import Button from '../ui/Button'
import Card from '../ui/Card'

const NotFound = () => {
  const location = useLocation()
  const currentPath = location.pathname

  // Suggest possible pages based on current path
  const getSuggestions = () => {
    const suggestions = []
    
    if (currentPath.includes('project')) {
      suggestions.push({ name: 'Projects', path: '/projects', icon: '📁' })
    }
    if (currentPath.includes('skill')) {
      suggestions.push({ name: 'Skills', path: '/skills', icon: '⚡' })
    }
    if (currentPath.includes('about')) {
      suggestions.push({ name: 'About', path: '/about', icon: '👋' })
    }
    if (currentPath.includes('contact')) {
      suggestions.push({ name: 'Contact', path: '/contact', icon: '📧' })
    }
    
    // Default suggestions
    if (suggestions.length === 0) {
      suggestions.push(
        { name: 'Projects', path: '/projects', icon: '📁' },
        { name: 'About', path: '/about', icon: '👋' },
        { name: 'Contact', path: '/contact', icon: '📧' }
      )
    }
    
    return suggestions
  }

  const suggestions = getSuggestions()

  return (
    <>
      <SEO 
        title="Page Not Found" 
        description="The page you're looking for doesn't exist."
        noIndex
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-gray-200 select-none animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-16 w-16 text-primary-500 animate-bounce" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500">
              Requested path: <code className="bg-gray-100 px-2 py-1 rounded">{currentPath}</code>
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Quick Actions
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  as={Link}
                  to="/"
                  variant="primary"
                  className="inline-flex items-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </Card>

            {/* Suggestions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Maybe you were looking for:
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {suggestions.map((suggestion, index) => (
                  <Link
                    key={index}
                    to={suggestion.path}
                    className="p-4 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group"
                  >
                    <div className="text-center">
                      <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">
                        {suggestion.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                        {suggestion.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Help Text */}
          <div className="text-sm text-gray-500">
            <p className="mb-2">Still can't find what you're looking for?</p>
            <Link 
              to="/contact" 
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Contact me directly
            </Link>
            {' '}and I'll help you find it.
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
