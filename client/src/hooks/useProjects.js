import { useState, useEffect } from 'react'
import { getProjects, getProjectBySlug } from '../services/projectService'
import { debounce } from '../utils/helpers'

/**
 * Hook for projects with filtering and pagination
 */
export const useProjects = (initialFilters = {}) => {
  const [projects, setProjects] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 0,
    limit: 9,
    total: 0
  })
  const [filters, setFilters] = useState({
    category: '',
    featured: undefined,
    search: '',
    sort: '-createdAt',
    ...initialFilters
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = async (currentFilters = filters, currentPage = pagination.page) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = {
        ...currentFilters,
        page: currentPage,
        limit: pagination.limit
      }
      
      // Remove empty values
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === undefined) {
          delete params[key]
        }
      })
      
      const data = await getProjects(params)
      setProjects(data.projects || [])
      setPagination(data.pagination || pagination)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  // Debounced search
  const debouncedFetch = debounce(fetchProjects, 500)

  useEffect(() => {
    fetchProjects()
  }, [])

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    
    // Reset to first page when filters change
    const newPage = 1
    setPagination(prev => ({ ...prev, page: newPage }))
    
    // Use debounced fetch for search, immediate for others
    if (newFilters.search !== undefined) {
      debouncedFetch(updatedFilters, newPage)
    } else {
      fetchProjects(updatedFilters, newPage)
    }
  }

  const changePage = (page) => {
    setPagination(prev => ({ ...prev, page }))
    fetchProjects(filters, page)
  }

  const refetch = () => {
    fetchProjects(filters, pagination.page)
  }

  return {
    projects,
    pagination,
    filters,
    loading,
    error,
    updateFilters,
    changePage,
    refetch
  }
}

/**
 * Hook for single project by slug
 */
export const useProject = (slug) => {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProjectBySlug(slug)
        setProject(data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Project not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  const refetch = () => {
    if (slug) {
      fetchProject()
    }
  }

  return { project, loading, error, refetch }
}
