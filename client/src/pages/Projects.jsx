import SEO from '../components/ui/SEO'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  useDocumentTitle('Projects')

  // Placeholder data - will be replaced with API data later
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-featured online store with shopping cart, payments, and admin panel',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://via.placeholder.com/400x250',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
      image: 'https://via.placeholder.com/400x250',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: false,
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with forecasts and interactive maps',
      technologies: ['React', 'TypeScript', 'Weather API', 'Tailwind'],
      image: 'https://via.placeholder.com/400x250',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: false,
    },
  ]

  return (
    <>
      <SEO 
        title="Projects" 
        description="View my portfolio of web development projects including React applications, Node.js APIs, and full-stack solutions."
      />
      
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              My Projects
            </h1>
            
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Here's a collection of projects I've worked on. Each project represents 
              a unique challenge and showcases different aspects of my development skills.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="group">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="mb-4">
                    {project.featured && (
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mb-2">
                        Featured
                      </span>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 inline-flex items-center justify-center"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex items-center justify-center"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
