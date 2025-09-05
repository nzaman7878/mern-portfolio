import { useParams } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import useDocumentTitle from '../hooks/useDocumentTitle'
import NotFound from '../components/common/NotFound'

const ProjectDetail = () => {
  const { slug } = useParams()
  useDocumentTitle(`Project: ${slug}`)

  // Placeholder - will be replaced with API call later
  const project = null

  if (!project) {
    return <NotFound />
  }

  return (
    <>
      <SEO 
        title={project.title} 
        description={project.description}
      />
      
      <div className="section-padding">
        <div className="container-max">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Project Detail: {slug}
          </h1>
          <p className="text-center text-gray-600">
            This page will show detailed project information when connected to the API.
          </p>
        </div>
      </div>
    </>
  )
}

export default ProjectDetail
