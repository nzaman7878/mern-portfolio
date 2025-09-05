import { useState, useRef } from 'react'
import { Upload, X, Image } from 'lucide-react'
import Button from '../ui/Button'

const ImageUpload = ({ 
  value = [], 
  onChange, 
  maxImages = 5,
  label = 'Project Images',
  error
}) => {
  const [previews, setPreviews] = useState(value.map(img => 
    typeof img === 'string' ? img : img.url
  ))
  const fileInputRef = useRef()

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    
    if (previews.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`)
      return
    }

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newPreview = e.target.result
          setPreviews(prev => [...prev, newPreview])
          
          // For now, just add placeholder URLs
          const newImage = {
            url: `https://via.placeholder.com/400x250?text=${encodeURIComponent(file.name)}`,
            alt: file.name,
            caption: ''
          }
          onChange([...value, newImage])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index)
    const newValue = value.filter((_, i) => i !== index)
    setPreviews(newPreviews)
    onChange(newValue)
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="space-y-4">
        {/* Upload Button */}
        {previews.length < maxImages && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images ({previews.length}/{maxImages})
            </Button>
          </div>
        )}

        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {previews.length === 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No images uploaded yet</p>
            <p className="text-sm text-gray-500">Click the upload button to add images</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default ImageUpload
