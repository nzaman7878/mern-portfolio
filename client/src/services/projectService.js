import { apiGet } from './api'

// Get all public projects with pagination and filters
export const getProjects = async (params = {}) => {
  const searchParams = new URLSearchParams()
  
  // Add pagination
  if (params.page) searchParams.append('page', params.page)
  if (params.limit) searchParams.append('limit', params.limit)
  
  // Add filters
  if (params.category) searchParams.append('category', params.category)
  if (params.featured !== undefined) searchParams.append('featured', params.featured)
  if (params.search) searchParams.append('search', params.search)
  if (params.sort) searchParams.append('sort', params.sort)
  
  const queryString = searchParams.toString()
  const url = queryString ? `/projects?${queryString}` : '/projects'
  
  return apiGet(url)
}

// Get project by slug
export const getProjectBySlug = async (slug) => {
  return apiGet(`/projects/${slug}`)
}

// Get featured projects (for homepage)
export const getFeaturedProjects = async (limit = 3) => {
  return apiGet(`/projects?featured=true&limit=${limit}`)
}

// Get project categories (derived from projects data)
export const getProjectCategories = async () => {
  // This could be a separate endpoint, but for now we'll derive from projects
  try {
    const { projects } = await getProjects({ limit: 100 })
    const categories = [...new Set(projects.map(p => p.category))]
    return categories
  } catch (error) {
    return ['web', 'mobile', 'desktop', 'api', 'other'] // fallback
  }
}

// Admin functions (will be used later)
export const getAllProjects = async () => {
  return apiGet('/projects/admin/all')
}

export const createProject = async (projectData) => {
  return apiPost('/projects', projectData)
}

export const updateProject = async (id, projectData) => {
  return apiPut(`/projects/${id}`, projectData)
}

export const deleteProject = async (id) => {
  return apiDelete(`/projects/${id}`)
}
