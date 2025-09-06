import { SITE_CONFIG } from './constants'

/**
 * Generate structured data for SEO
 */
export const generateStructuredData = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Person':
      return {
        ...baseData,
        name: data.name || SITE_CONFIG.author,
        jobTitle: data.jobTitle || 'Full-Stack Developer',
        url: data.url || SITE_CONFIG.url,
        sameAs: data.socialLinks || [],
        knowsAbout: data.skills || [],
        worksFor: {
          '@type': 'Organization',
          name: data.company || 'Freelance'
        }
      }

    case 'WebSite':
      return {
        ...baseData,
        name: data.name || SITE_CONFIG.name,
        url: data.url || SITE_CONFIG.url,
        description: data.description || SITE_CONFIG.description,
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author
        }
      }

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate,
        mainEntityOfPage: data.url
      }

    case 'SoftwareApplication':
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        applicationCategory: 'WebApplication',
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author
        },
        url: data.demoUrl,
        codeRepository: data.repositoryUrl
      }

    default:
      return baseData
  }
}

/**
 * Inject structured data into page head
 */
export const injectStructuredData = (data) => {
  if (typeof window === 'undefined') return

  const existingScript = document.querySelector('script[type="application/ld+json"]')
  if (existingScript) {
    existingScript.remove()
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * Generate Open Graph image URL
 */
export const generateOGImage = (title, subtitle = '', template = 'default') => {
  // In a real implementation, you might use a service like Vercel OG Image Generation
  // For now, return a placeholder or static image
  const baseUrl = SITE_CONFIG.url
  
  if (template === 'project') {
    return `${baseUrl}/og-project.jpg`
  }
  
  return `${baseUrl}/og-image.jpg`
}

/**
 * Update meta tags dynamically
 */
export const updateMetaTags = (tags) => {
  Object.entries(tags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
    
    if (!meta) {
      meta = document.createElement('meta')
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        meta.setAttribute('property', name)
      } else {
        meta.setAttribute('name', name)
      }
      document.head.appendChild(meta)
    }
    
    meta.setAttribute('content', content)
  })
}
