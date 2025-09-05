import { useParams } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import ProjectDetail from '../components/projects/ProjectDetail'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useProject } from '../hooks/useProjects'

const ProjectDetailPage = () => {
  const { slug } = useParams()
  const { project, loading, error, refetch } = useProject(slug)
  
  useDocumentTitle(project?.title || 'Project Detail')

  return (
    <>
      <SEO 
        title={project?.title}
        description={project?.description}
        keywords={project?.technologies?.join(', ')}
        type="article"
      />
      
      <div className="section-padding">
        <div className="container-max">
          <ProjectDetail
            project={project}
            loading={loading}
            error={error}
            onRetry={refetch}
          />
        </div>
      </div>
    </>
  )
}

export default ProjectDetailPage
