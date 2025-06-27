import { FILE_UPLOAD } from "@/config/constants"

interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

interface FileMetadata {
  filename: string
  contentType: string
  size: number
  uploadedAt: Date
  path: string
}

export const uploadFile = async (
  file: File,
  folder: string = "general"
): Promise<UploadResult> => {
  try {
    // Validate file size
    if (file.size > FILE_UPLOAD.maxSize) {
      return {
        success: false,
        error: `File size must not exceed ${FILE_UPLOAD.maxSize / (1024 * 1024)}MB`
      }
    }

    // Validate file type
    if (!FILE_UPLOAD.allowedTypes.includes(file.type as typeof FILE_UPLOAD.allowedTypes[number])) {
      return {
        success: false,
        error: "File type not supported"
      }
    }

    // In a real app, this would upload to a cloud storage service
    // For now, simulate a successful upload
    const timestamp = new Date().getTime()
    const filename = `${folder}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    
    console.log('Uploading file:', {
      filename,
      type: file.type,
      size: file.size
    })

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      url: `https://storage.example.com/${filename}`
    }
  } catch (error) {
    console.error('File upload failed:', error)
    return {
      success: false,
      error: 'Failed to upload file'
    }
  }
}

export const deleteFile = async (url: string): Promise<boolean> => {
  try {
    // In a real app, this would delete from cloud storage
    console.log('Deleting file:', url)
    
    // Simulate deletion delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return true
  } catch (error) {
    console.error('File deletion failed:', error)
    return false
  }
}

export const getFileMetadata = async (url: string): Promise<FileMetadata | null> => {
  try {
    // In a real app, this would fetch metadata from cloud storage
    console.log('Getting file metadata:', url)
    
    // Simulate metadata fetch
    const filename = url.split('/').pop() || ''
    const [timestamp, originalName] = filename.split('-')
    
    return {
      filename: originalName,
      contentType: getContentTypeFromFilename(originalName),
      size: Math.floor(Math.random() * 5 * 1024 * 1024), // Random size up to 5MB
      uploadedAt: new Date(parseInt(timestamp)),
      path: url
    }
  } catch (error) {
    console.error('Failed to get file metadata:', error)
    return null
  }
}

export const generatePresignedUrl = async (
  url: string,
  expiresInMinutes: number = 60
): Promise<string | null> => {
  try {
    // In a real app, this would generate a presigned URL from cloud storage
    console.log('Generating presigned URL:', {
      url,
      expiresInMinutes
    })
    
    // Simulate presigned URL generation
    const expiryTimestamp = Date.now() + expiresInMinutes * 60 * 1000
    return `${url}?expires=${expiryTimestamp}&signature=mock_signature`
  } catch (error) {
    console.error('Failed to generate presigned URL:', error)
    return null
  }
}

export const isImageFile = (file: File): boolean => {
  return FILE_UPLOAD.imageTypes.includes(file.type as typeof FILE_UPLOAD.imageTypes[number])
}

export const isDocumentFile = (file: File): boolean => {
  return FILE_UPLOAD.documentTypes.includes(file.type as typeof FILE_UPLOAD.documentTypes[number])
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

const getContentTypeFromFilename = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'webp':
      return 'image/webp'
    case 'pdf':
      return 'application/pdf'
    default:
      return 'application/octet-stream'
  }
}

export const validateImageDimensions = async (
  file: File,
  minWidth: number = 100,
  minHeight: number = 100,
  maxWidth: number = 4096,
  maxHeight: number = 4096
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isImageFile(file)) {
      resolve(false)
      return
    }

    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(
        img.width >= minWidth &&
        img.width <= maxWidth &&
        img.height >= minHeight &&
        img.height <= maxHeight
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(false)
    }

    img.src = url
  })
}

export const compressImage = async (
  file: File,
  maxSizeInMB: number = 1,
  quality: number = 0.8
): Promise<File | null> => {
  try {
    if (!isImageFile(file)) {
      return null
    }

    const img = new Image()
    const url = URL.createObjectURL(file)

    return new Promise((resolve) => {
      img.onload = () => {
        URL.revokeObjectURL(url)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          resolve(null)
          return
        }

        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(null)
              return
            }

            // If the compressed size is still too large, reduce quality and try again
            if (blob.size > maxSizeInMB * 1024 * 1024 && quality > 0.1) {
              resolve(compressImage(file, maxSizeInMB, quality - 0.1))
              return
            }

            resolve(new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            }))
          },
          file.type,
          quality
        )
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve(null)
      }

      img.src = url
    })
  } catch (error) {
    console.error('Image compression failed:', error)
    return null
  }
}
