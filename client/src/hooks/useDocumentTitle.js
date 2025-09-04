import { useEffect } from 'react'
import { SITE_CONFIG } from '../utils/constants'

/**
 * Hook to dynamically set document title
 * @param {string} title - Page title
 * @param {boolean} includeDefault - Whether to include site name
 */
const useDocumentTitle = (title, includeDefault = true) => {
  useEffect(() => {
    const fullTitle = includeDefault && title 
      ? `${title} | ${SITE_CONFIG.name}`
      : title || SITE_CONFIG.name
    
    document.title = fullTitle
    
    // Cleanup
    return () => {
      document.title = SITE_CONFIG.name
    }
  }, [title, includeDefault])
}

export default useDocumentTitle
