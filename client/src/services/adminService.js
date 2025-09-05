import { apiGet, apiPost, apiPut, apiDelete } from './api'

// Projects Admin API
export const projectsAdmin = {
  getAll: () => apiGet('/projects/admin/all'),
  create: (data) => apiPost('/projects', data),
  update: (id, data) => apiPut(`/projects/${id}`, data),
  delete: (id) => apiDelete(`/projects/${id}`)
}

// Skills Admin API
export const skillsAdmin = {
  getAll: () => apiGet('/skills/admin/all'),
  create: (data) => apiPost('/skills', data),
  update: (id, data) => apiPut(`/skills/${id}`, data),
  delete: (id) => apiDelete(`/skills/${id}`)
}

// Timeline Admin API
export const timelineAdmin = {
  getAll: () => apiGet('/timeline/admin/all'),
  create: (data) => apiPost('/timeline', data),
  update: (id, data) => apiPut(`/timeline/${id}`, data),
  delete: (id) => apiDelete(`/timeline/${id}`)
}

// Contact Messages Admin API
export const contactAdmin = {
  getAll: (params) => {
    const searchParams = new URLSearchParams(params)
    return apiGet(`/contact/admin/all?${searchParams}`)
  },
  getById: (id) => apiGet(`/contact/admin/${id}`),
  update: (id, data) => apiPut(`/contact/admin/${id}`, data),
  delete: (id) => apiDelete(`/contact/admin/${id}`)
}

// Dashboard Stats (placeholder for future implementation)
export const dashboardAdmin = {
  getStats: async () => {
    // This would be a real endpoint in production
    return {
      projects: { total: 10, published: 8 },
      skills: { total: 15, featured: 5 },
      timeline: { total: 6, current: 1 },
      messages: { total: 25, unread: 3 }
    }
  }
}
