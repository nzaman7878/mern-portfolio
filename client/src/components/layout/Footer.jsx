import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { SITE_CONFIG, SOCIAL_LINKS, NAVIGATION_ITEMS } from '../../utils/constants'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-gray-400 mb-4">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-4">
              {Object.entries(SOCIAL_LINKS)
                .filter(([platform, url]) => !!socialIcons[platform] && !!url)
                .map(([platform, url]) => {
                  const Icon = socialIcons[platform]
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={`Visit ${platform} profile`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {(NAVIGATION_ITEMS || []).map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <p className="text-gray-400 mb-2">
              Interested in working together?
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
