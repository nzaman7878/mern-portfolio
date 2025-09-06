/**
 * Web Vitals measurement
 */
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return

  // Measure and report Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
      // Report to analytics service
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime)
        // Report to analytics service
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    let clsScore = 0
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value
        }
      })
      console.log('CLS:', clsScore)
      // Report to analytics service
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  }
}

/**
 * Preload critical resources
 */
export const preloadResources = (resources) => {
  resources.forEach((resource) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.href
    link.as = resource.as || 'image'
    if (resource.type) link.type = resource.type
    document.head.appendChild(link)
  })
}

/**
 * Lazy load images with Intersection Observer
 */
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

/**
 * Monitor network status
 */
export const monitorNetworkStatus = (callback) => {
  if ('navigator' in window && 'onLine' in navigator) {
    const updateOnlineStatus = () => {
      callback({
        isOnline: navigator.onLine,
        connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection
      })
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    
    // Initial check
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }
}

/**
 * Performance budget checker
 */
export const checkPerformanceBudget = () => {
  if (!('performance' in window)) return

  const navigation = performance.getEntriesByType('navigation')[0]
  const budget = {
    firstContentfulPaint: 1500, // 1.5s
    domContentLoaded: 2000, // 2s
    loadComplete: 3000, // 3s
  }

  const metrics = {
    fcp: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime,
    dcl: navigation.domContentLoadedEventEnd - navigation.navigationStart,
    load: navigation.loadEventEnd - navigation.navigationStart,
  }

  const issues = []
  if (metrics.fcp > budget.firstContentfulPaint) {
    issues.push(`FCP exceeded budget: ${metrics.fcp}ms > ${budget.firstContentfulPaint}ms`)
  }
  if (metrics.dcl > budget.domContentLoaded) {
    issues.push(`DCL exceeded budget: ${metrics.dcl}ms > ${budget.domContentLoaded}ms`)
  }
  if (metrics.load > budget.loadComplete) {
    issues.push(`Load exceeded budget: ${metrics.load}ms > ${budget.loadComplete}ms`)
  }

  if (issues.length > 0) {
    console.warn('Performance budget exceeded:', issues)
  } else {
    console.log('Performance budget: ✓ All metrics within budget')
  }

  return { metrics, issues }
}
