import { useState, useEffect } from 'react'
import SEO from '../components/ui/SEO'
import ProjectGrid from '../components/projects/ProjectGrid'
import ProjectFilters from '../components/projects/ProjectFilters'
import ProjectSearch from '../components/projects/ProjectSearch'
import Pagination from '../components/ui/Pagination'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useProjects } from '../hooks/useProjects'
import { parseUrlParams } from '../utils/helpers'

const Projects = () => {
  useDocumentTitle('Projects')
  
  // Initialize filters from URL params
  const [initialFilters] = useState(() => {
    const params = parseUrlParams(window.location.search)
    return {
      category: params.category || '',
      featured: params.featured === 'true' ? true : params.featured === 'false' ? false : undefined,
      search: params.search || '',
      sort: params.sort || '-createdAt'
    }
  })

  const {
    projects,
    pagination,
    filters,
    loading,
    error,
    updateFilters,
    changePage,
    refetch
  } = useProjects(initialFilters)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== undefined) {
        params.set(key, value)
      }
    })
    
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname
    
    window.history.replaceState({}, '', newUrl)
  }, [filters])

  const handleSearchChange = (search) => {
    updateFilters({ search })
  }

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters)
  }

  const handlePageChange = (page) => {
    changePage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <SEO 
        title="Projects" 
        description="View my portfolio of web development projects including React applications, Node.js APIs, and full-stack solutions."
        keywords="projects, portfolio, web development, react, nodejs, full-stack"
      />
      
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                My Projects
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Here's a collection of projects I've worked on. Each project represents 
                a unique challenge and showcases different aspects of my development skills.
              </p>
            </div>

            {/* Search */}
            <ProjectSearch
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search projects by title, description, or technology..."
            />

            {/* Filters */}
            <ProjectFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* Results Info */}
            {!loading && !error && (
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {pagination.total > 0 ? (
                    <>
                      Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} projects
                      {filters.search && ` for "${filters.search}"`}
                      {filters.category && ` in "${filters.category}"`}
                    </>
                  ) : (
                    'No projects found'
                  )}
                </p>
              </div>
            )}

            {/* Projects Grid */}
            <ProjectGrid
              projects={projects}
              loading={loading}
              error={error}
              onRetry={refetch}
            />

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
