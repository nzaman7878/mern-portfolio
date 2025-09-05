import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

/**
 * Generic admin CRUD hook
 */
export const useAdminCrud = (service, entityName = 'item') => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await service.getAll()
      setItems(Array.isArray(data) ? data : data.items || [])
    } catch (err) {
      const errorMsg = err.response?.data?.message || `Failed to fetch ${entityName}s`
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const createItem = async (itemData) => {
    try {
      const newItem = await service.create(itemData)
      setItems(prev => [newItem, ...prev])
      toast.success(`${entityName} created successfully`)
      return newItem
    } catch (err) {
      const errorMsg = err.response?.data?.message || `Failed to create ${entityName}`
      toast.error(errorMsg)
      throw err
    }
  }

  const updateItem = async (id, itemData) => {
    try {
      const updatedItem = await service.update(id, itemData)
      setItems(prev => prev.map(item => 
        item._id === id ? updatedItem : item
      ))
      toast.success(`${entityName} updated successfully`)
      return updatedItem
    } catch (err) {
      const errorMsg = err.response?.data?.message || `Failed to update ${entityName}`
      toast.error(errorMsg)
      throw err
    }
  }

  const deleteItem = async (id) => {
    try {
      await service.delete(id)
      setItems(prev => prev.filter(item => item._id !== id))
      toast.success(`${entityName} deleted successfully`)
    } catch (err) {
      const errorMsg = err.response?.data?.message || `Failed to delete ${entityName}`
      toast.error(errorMsg)
      throw err
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  }
}
