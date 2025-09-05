import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Home = () => {
  useDocumentTitle('Home')

  return (
    <>
      <SEO 
        title="Home"
        description="Full-stack developer specializing in React, Node.js, and MongoDB. Welcome to my portfolio."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Hi, I'm{' '}
              <span className="text-gradient">NURUZZAMAN</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in animation-delay-200">
              Full-Stack Developer
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-400">
              I create modern web applications using React, Node.js, and MongoDB. 
              Passionate about building user-friendly interfaces and scalable backend systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
              <Button
                as={Link}
                to="/projects"
                variant="primary"
                size="lg"
                className="inline-flex items-center"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="inline-flex items-center"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary-600">50+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary-600">3+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary-600">20+</h3>
              <p className="text-gray-600">Technologies</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary-600">100%</h3>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
