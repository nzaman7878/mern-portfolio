// Google Analytics 4 implementation
export const initGA = (measurementId) => {
  if (typeof window === 'undefined' || !measurementId) return

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  })
}

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window.gtag === 'undefined') return

  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
    page_title: title,
    page_location: `${window.location.origin}${path}`,
  })
}

// Track events
export const trackEvent = (action, category, label, value) => {
  if (typeof window.gtag === 'undefined') return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track contact form submissions
export const trackContact = (method = 'contact_form') => {
  trackEvent('contact', 'engagement', method)
}

// Track project views
export const trackProjectView = (projectSlug) => {
  trackEvent('project_view', 'content', projectSlug)
}
