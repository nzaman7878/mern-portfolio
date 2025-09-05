import { Link } from 'react-router-dom'
import { ExternalLink, Github, Eye, Calendar } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { formatDate, truncateText, getProjectCategoryName } from '../../utils/helpers'

const ProjectCard = ({ project, className = '' }) => {
  const {
    title,
    slug,
    description,
    technologies = [],
    category,
    featured,
    images = [],
    links = {},
    views = 0,
    createdAt
  } = project

  const featuredImage = images[0]?.url || 'https://via.placeholder.com/400x250?text=Project+Image'

  return (
    <Card className={`group h-full flex flex-col ${className}`}>
      {/* Project Image */}
      <Link to={`/projects/${slug}`} className="block">
        <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Project Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {featured && (
                <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mb-2">
                  Featured
                </span>
              )}
              <Link to={`/projects/${slug}`}>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                  {title}
                </h3>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {getProjectCategoryName(category)}
            </span>
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {views}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(createdAt, { month: 'short', year: 'numeric' })}
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            {truncateText(description, 120)}
          </p>
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            as={Link}
            to={`/projects/${slug}`}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
          
          {links.live && (
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center"
              onClick={(e) => {
                e.preventDefault()
                window.open(links.live, '_blank', 'noopener,noreferrer')
              }}
              title="View Live Demo"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          
          {links.github && (
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center"
              onClick={(e) => {
                e.preventDefault()
                window.open(links.github, '_blank', 'noopener,noreferrer')
              }}
              title="View Source Code"
            >
              <Github className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
