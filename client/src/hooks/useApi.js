import { useState, useEffect } from 'react'

/**
 * Generic hook for API calls with loading and error states
 * @param {Function} apiFunction - Function that returns a promise
 * @param {*} defaultValue - Default value while loading
 * @param {Array} dependencies - Dependencies to trigger refetch
 */
const useApi = (apiFunction, defaultValue = null, dependencies = []) => {
  const [data, setData] = useState(defaultValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction()
      setData(result)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

export default useApi
