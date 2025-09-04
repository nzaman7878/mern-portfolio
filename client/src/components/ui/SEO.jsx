import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../../utils/constants'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  noIndex = false 
}) => {
  const seoTitle = title 
    ? `${title} | ${SITE_CONFIG.name}` 
    : SITE_CONFIG.name
  
  const seoDescription = description || SITE_CONFIG.description
  const seoImage = image || `${SITE_CONFIG.url}/og-image.jpg`
  const seoUrl = url || SITE_CONFIG.url

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_CONFIG.author} />
      <link rel="canonical" href={seoUrl} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />
    </Helmet>
  )
}

export default SEO
