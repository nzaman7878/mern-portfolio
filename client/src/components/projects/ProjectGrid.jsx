import ProjectCard from './ProjectCard'
import Loading from '../ui/Loading'
import ErrorMessage from '../ui/ErrorMessage'
import EmptyState from '../ui/EmptyState'
import { FolderOpen } from 'lucide-react'

const ProjectGrid = ({ projects, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading text="Loading projects..." />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={onRetry} />
  }

  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        icon={FolderOpen}
        title="No projects found"
        description="No projects match your current filters. Try adjusting your search criteria."
      />
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project._id || project.id} 
          project={project}
          className="animate-fade-in"
        />
      ))}
    </div>
  )
}

export default ProjectGrid
