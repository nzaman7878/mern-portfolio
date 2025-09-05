import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, Calendar, Eye, Tag } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import ErrorMessage from '../ui/ErrorMessage'
import { formatDate, formatDateRange, calculateReadingTime, getProjectCategoryName } from '../../utils/helpers'

const ProjectDetail = ({ project, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading size="lg" text="Loading project..." />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={onRetry} />
  }

  if (!project) {
    return <ErrorMessage error="Project not found" />
  }

  const {
    title,
    description,
    content,
    technologies = [],
    category,
    status,
    featured,
    images = [],
    links = {},
    startDate,
    endDate,
    views = 0,
    createdAt
  } = project

  const readingTime = calculateReadingTime(content || '')
  const projectDuration = formatDateRange(startDate, endDate)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button
          as={Link}
          to="/projects"
          variant="ghost"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {featured && (
            <span className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
              Featured Project
            </span>
          )}
          <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
            {getProjectCategoryName(category)}
          </span>
          {status && (
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full capitalize">
              {status.replace('-', ' ')}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        
        <p className="text-xl text-gray-600 mb-6">{description}</p>

        {/* Project Meta */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-6 mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {projectDuration}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            {views} views
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            {readingTime} min read
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {links.live && (
            <Button
              variant="primary"
              onClick={() => window.open(links.live, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live Demo
            </Button>
          )}
          
          {links.github && (
            <Button
              variant="outline"
              onClick={() => window.open(links.github, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center"
            >
              <Github className="h-4 w-4 mr-2" />
              View Source Code
            </Button>
          )}
          
          {links.demo && (
            <Button
              variant="outline"
              onClick={() => window.open(links.demo, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Button>
          )}
        </div>
      </div>

      {/* Project Images */}
      {images.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Card key={index} padding={false} className="overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt || `${title} screenshot ${index + 1}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                {image.caption && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600">{image.caption}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-800 px-3 py-2 rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Project Content */}
      {content && (
        <Card className="mb-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Card>
      )}

      {/* Related Projects CTA */}
      <Card className="text-center">
        <h3 className="text-xl font-semibold mb-4">Interested in more projects?</h3>
        <p className="text-gray-600 mb-6">
          Check out my other work or get in touch to discuss your next project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            to="/projects"
            variant="outline"
          >
            View All Projects
          </Button>
          <Button
            as={Link}
            to="/contact"
            variant="primary"
          >
            Get In Touch
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ProjectDetail
