import { CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Card from '../ui/Card'

const ContactSuccess = ({ onReset }) => {
  return (
    <Card className="text-center py-12">
      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Message Sent Successfully!
      </h2>
      
      <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
        Thank you for reaching out! I've received your message and will get back to you within 24-48 hours.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
        <div className="flex items-start">
          <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">What happens next?</p>
            <ul className="text-left space-y-1">
              <li>• You'll receive an auto-reply confirmation</li>
              <li>• I'll review your message personally</li>
              <li>• Expect a detailed response within 24-48 hours</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onReset}
          variant="primary"
        >
          Send Another Message
        </Button>
        
        <Button
          as={Link}
          to="/projects"
          variant="outline"
          className="inline-flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          View My Projects
        </Button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Want to connect on other platforms?
        </p>
        <div className="flex justify-center space-x-4 mt-3">
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-700 text-sm"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 text-sm"
          >
            Twitter
          </a>
        </div>
      </div>
    </Card>
  )
}

export default ContactSuccess
