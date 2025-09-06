import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import SEO from '../components/ui/SEO'
import Card from '../components/ui/Card'
import ContactForm from '../components/contact/ContactForm'
import ContactSuccess from '../components/contact/ContactSuccess'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { SITE_CONFIG } from '../utils/constants'

const Contact = () => {
  useDocumentTitle('Contact')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccess = () => {
    setShowSuccess(true)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setShowSuccess(false)
  }

  return (
    <>
      <SEO 
        title="Contact" 
        description="Get in touch with me for project collaborations, job opportunities, or just to say hello. I respond within 24-48 hours."
        keywords="contact, hire developer, project collaboration, freelance developer"
      />
      
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                I'm always interested in new opportunities and collaborations. 
                Whether you have a project in mind, want to discuss potential work, 
                or just want to say hello, I'd love to hear from you!
              </p>
            </div>

            {showSuccess ? (
              <ContactSuccess onReset={handleReset} />
            ) : (
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Send a Message</h2>
                    <p className="text-gray-600">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </div>
                  <ContactForm onSuccess={handleSuccess} />
                </Card>

                {/* Contact Information */}
                <div className="space-y-8">
                  {/* Contact Details */}
                  <Card>
                    <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <Mail className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                          <a
                            href={`mailto:${SITE_CONFIG.email}`}
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            {SITE_CONFIG.email}
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            Best way to reach me for business inquiries
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                          <p className="text-gray-600">Available upon request</p>
                          <p className="text-sm text-gray-500 mt-1">
                            For established clients and urgent matters
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                          <p className="text-gray-600">Remote Worldwide</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Available for remote work across timezones
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Response Time</h3>
                          <p className="text-gray-600">24-48 hours</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Usually faster during business days
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* What I Can Help With */}
                  <Card>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 text-primary-600 mr-2" />
                      What I Can Help With
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="bg-primary-100 text-primary-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>Custom web application development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-100 text-primary-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>React and Node.js project consultation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-100 text-primary-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>Full-stack development services</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-100 text-primary-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>Code reviews and technical mentoring</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-100 text-primary-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>API design and database architecture</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-100 text-primary-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>Performance optimization and scaling</span>
                      </li>
                    </ul>
                  </Card>

                  {/* Availability */}
                  <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                    <h3 className="text-xl font-semibold text-primary-900 mb-3">
                      Current Availability
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-primary-800 font-medium">Available for new projects</span>
                    </div>
                    <p className="text-primary-700 text-sm">
                      I'm currently accepting new client work and interesting project collaborations. 
                      Let's discuss how we can work together to bring your ideas to life.
                    </p>
                  </Card>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {!showSuccess && (
              <div className="mt-16 pt-16 border-t border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Frequently Asked Questions
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <Card>
                    <h3 className="text-lg font-semibold mb-3">What's your typical response time?</h3>
                    <p className="text-gray-600">
                      I aim to respond to all inquiries within 24-48 hours. For urgent matters, 
                      please mention it in your message subject line.
                    </p>
                  </Card>

                  <Card>
                    <h3 className="text-lg font-semibold mb-3">Do you work with international clients?</h3>
                    <p className="text-gray-600">
                      Absolutely! I work with clients worldwide and am comfortable with 
                      various timezone arrangements and communication preferences.
                    </p>
                  </Card>

                  <Card>
                    <h3 className="text-lg font-semibold mb-3">What information should I include?</h3>
                    <p className="text-gray-600">
                      Please include project details, timeline, budget range (if applicable), 
                      and any specific requirements. The more context you provide, the better I can help.
                    </p>
                  </Card>

                  <Card>
                    <h3 className="text-lg font-semibold mb-3">Do you offer free consultations?</h3>
                    <p className="text-gray-600">
                      Yes! I offer a free initial consultation to discuss your project needs, 
                      provide technical insights, and determine if we're a good fit to work together.
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
