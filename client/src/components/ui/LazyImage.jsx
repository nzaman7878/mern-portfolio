import { useState, useRef, useEffect } from 'react'
import { ImageIcon } from 'lucide-react'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad = () => {},
  onError = () => {},
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad()
  }

  const handleError = () => {
    setIsError(true)
    onError()
  }

  return (
    <div ref={imgRef} className={`relative ${className}`} {...props}>
      {/* Placeholder */}
      {(!isLoaded || isError) && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {placeholder || (
            <div className="text-center">
              <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">
                {isError ? 'Failed to load' : 'Loading...'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actual Image */}
      {isInView && !isError && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading="lazy"
        />
      )}
    </div>
  )
}

export default LazyImage
