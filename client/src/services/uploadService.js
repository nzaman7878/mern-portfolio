import { api } from './api'

export const uploadService = {
  // Upload single image (placeholder - you'd implement this endpoint)
  uploadImage: async (file, folder = 'projects') => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('folder', folder)
    
    try {
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // For now, return placeholder URLs
  getPlaceholderUrl: (width = 400, height = 250, text = 'Project Image') => {
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`
  }
}
