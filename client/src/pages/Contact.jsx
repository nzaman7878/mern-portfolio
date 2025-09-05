import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import SEO from '../components/ui/SEO'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { SITE_CONFIG } from '../utils/constants'

const Contact = () => {
  useDocumentTitle('Contact')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Placeholder - will be replaced with API call later
    setTimeout(() => {
      alert('Message sent! (This is a placeholder)')
      setLoading(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <SEO 
        title="Contact" 
        description="Get in touch with me for project collaborations, job opportunities, or just to say hello."
      />
      
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Get In Touch
            </h1>
            
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              I'm always interested in new opportunities and collaborations. 
              Feel free to reach out if you'd like to work together or just want to say hello!
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full inline-flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${SITE_CONFIG.email}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">Available upon request</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">Available for remote work</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
                  <p className="text-gray-600 mb-4">
                    I'm always open to discussing new projects, creative ideas, or 
                    opportunities to be part of your vision.
                  </p>
                  <p className="text-gray-600">
                    Response time: Usually within 24 hours
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
