import { Wrench, Clock, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SEO from '../ui/SEO'

const Maintenance = ({ estimatedTime, reason }) => {
  return (
    <>
      <SEO 
        title="Site Maintenance" 
        description="Site temporarily under maintenance. We'll be back shortly."
        noIndex
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="relative">
              <Wrench className="h-20 w-20 text-primary-600 mx-auto mb-6 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Under Maintenance
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              I'm currently updating the site to serve you better. 
              {reason && ` ${reason}`}
            </p>
            
            {estimatedTime && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center text-primary-700">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    Estimated completion: {estimatedTime}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              In the meantime, you can:
            </p>
            
            <div className="grid gap-3">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Check out my GitHub
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Connect on LinkedIn
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              
              <a
                href="mailto:hello@yourportfolio.com"
                className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Email me directly
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
            
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              className="mt-6"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Maintenance
