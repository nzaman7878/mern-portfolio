export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'Portfolio',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@example.com',
  description: 'Full-stack developer specializing in React, Node.js, and MongoDB',
  author: 'Your Name',
}

export const NAVIGATION_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
]

export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'mailto:hello@yourportfolio.com',
}

export const SKILL_CATEGORIES = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  design: 'Design',
  other: 'Other',
}

export const PROJECT_CATEGORIES = {
  web: 'Web Application',
  mobile: 'Mobile App',
  desktop: 'Desktop App',
  api: 'API/Backend',
  other: 'Other',
}
