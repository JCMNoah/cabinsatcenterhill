import { supabase, supabaseAdmin } from './supabase'

// Storage bucket names
export const STORAGE_BUCKETS = {
  CABIN_IMAGES: 'cabin-images',
  AVATARS: 'avatars',
  DOCUMENTS: 'documents',
} as const

// File upload utilities
export const storageUtils = {
  // Upload a file to a specific bucket
  async uploadFile(
    bucket: string,
    path: string,
    file: File | Blob,
    options?: {
      cacheControl?: string
      contentType?: string
      upsert?: boolean
    }
  ) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: options?.cacheControl || '3600',
        contentType: options?.contentType || file.type,
        upsert: options?.upsert || false,
      })

    if (error) throw error
    return data
  },

  // Upload multiple files
  async uploadFiles(
    bucket: string,
    files: Array<{ path: string; file: File | Blob }>
  ) {
    const uploads = files.map(({ path, file }) =>
      this.uploadFile(bucket, path, file)
    )

    const results = await Promise.allSettled(uploads)
    
    const successful = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value)
    
    const failed = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map(result => result.reason)

    return { successful, failed }
  },

  // Get public URL for a file
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return data.publicUrl
  },

  // Get signed URL for private files
  async getSignedUrl(
    bucket: string,
    path: string,
    expiresIn: number = 3600
  ): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error) throw error
    return data.signedUrl
  },

  // Delete a file
  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
  },

  // Delete multiple files
  async deleteFiles(bucket: string, paths: string[]) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove(paths)

    if (error) throw error
  },

  // List files in a folder
  async listFiles(bucket: string, folder?: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder)

    if (error) throw error
    return data
  },

  // Move/rename a file
  async moveFile(bucket: string, fromPath: string, toPath: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .move(fromPath, toPath)

    if (error) throw error
  },

  // Copy a file
  async copyFile(bucket: string, fromPath: string, toPath: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .copy(fromPath, toPath)

    if (error) throw error
  },
}

// Cabin image specific utilities
export const cabinImageUtils = {
  // Generate a unique path for cabin images
  generateImagePath(cabinId: string, fileName: string): string {
    const timestamp = Date.now()
    const extension = fileName.split('.').pop()
    return `${cabinId}/${timestamp}.${extension}`
  },

  // Upload cabin images
  async uploadCabinImages(cabinId: string, files: File[]): Promise<string[]> {
    const uploads = files.map(file => {
      const path = this.generateImagePath(cabinId, file.name)
      return storageUtils.uploadFile(STORAGE_BUCKETS.CABIN_IMAGES, path, file)
    })

    const results = await Promise.allSettled(uploads)
    
    const successfulPaths = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value.path)

    // Return public URLs
    return successfulPaths.map(path => 
      storageUtils.getPublicUrl(STORAGE_BUCKETS.CABIN_IMAGES, path)
    )
  },

  // Delete cabin images
  async deleteCabinImages(imageUrls: string[]) {
    const paths = imageUrls.map(url => {
      // Extract path from public URL
      const urlParts = url.split('/')
      const bucketIndex = urlParts.findIndex(part => part === STORAGE_BUCKETS.CABIN_IMAGES)
      return urlParts.slice(bucketIndex + 1).join('/')
    })

    await storageUtils.deleteFiles(STORAGE_BUCKETS.CABIN_IMAGES, paths)
  },

  // Get cabin images for a specific cabin
  async getCabinImages(cabinId: string) {
    const files = await storageUtils.listFiles(STORAGE_BUCKETS.CABIN_IMAGES, cabinId)
    
    return files.map(file => ({
      name: file.name,
      url: storageUtils.getPublicUrl(STORAGE_BUCKETS.CABIN_IMAGES, `${cabinId}/${file.name}`),
      size: file.metadata?.size,
      lastModified: file.updated_at,
    }))
  },
}

// Avatar utilities
export const avatarUtils = {
  // Generate avatar path
  generateAvatarPath(userId: string, fileName: string): string {
    const extension = fileName.split('.').pop()
    return `${userId}/avatar.${extension}`
  },

  // Upload user avatar
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const path = this.generateAvatarPath(userId, file.name)
    
    await storageUtils.uploadFile(STORAGE_BUCKETS.AVATARS, path, file, {
      upsert: true, // Replace existing avatar
    })

    return storageUtils.getPublicUrl(STORAGE_BUCKETS.AVATARS, path)
  },

  // Delete user avatar
  async deleteAvatar(userId: string) {
    const files = await storageUtils.listFiles(STORAGE_BUCKETS.AVATARS, userId)
    const paths = files.map(file => `${userId}/${file.name}`)
    
    if (paths.length > 0) {
      await storageUtils.deleteFiles(STORAGE_BUCKETS.AVATARS, paths)
    }
  },
}

// File validation utilities
export const fileValidation = {
  // Validate image file
  validateImage(file: File, options?: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
    maxWidth?: number
    maxHeight?: number
  }): Promise<{ valid: boolean; error?: string }> {
    return new Promise((resolve) => {
      const maxSize = options?.maxSize || 5 * 1024 * 1024 // 5MB default
      const allowedTypes = options?.allowedTypes || ['image/jpeg', 'image/png', 'image/webp']

      // Check file size
      if (file.size > maxSize) {
        resolve({
          valid: false,
          error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
        })
        return
      }

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        resolve({
          valid: false,
          error: `File type must be one of: ${allowedTypes.join(', ')}`
        })
        return
      }

      // Check image dimensions if specified
      if (options?.maxWidth || options?.maxHeight) {
        const img = new Image()
        img.onload = () => {
          if (options.maxWidth && img.width > options.maxWidth) {
            resolve({
              valid: false,
              error: `Image width must be less than ${options.maxWidth}px`
            })
            return
          }

          if (options.maxHeight && img.height > options.maxHeight) {
            resolve({
              valid: false,
              error: `Image height must be less than ${options.maxHeight}px`
            })
            return
          }

          resolve({ valid: true })
        }

        img.onerror = () => {
          resolve({
            valid: false,
            error: 'Invalid image file'
          })
        }

        img.src = URL.createObjectURL(file)
      } else {
        resolve({ valid: true })
      }
    })
  },

  // Validate multiple images
  async validateImages(files: File[], options?: Parameters<typeof this.validateImage>[1]) {
    const validations = await Promise.all(
      files.map(file => this.validateImage(file, options))
    )

    const invalid = validations
      .map((validation, index) => ({ validation, index }))
      .filter(({ validation }) => !validation.valid)

    return {
      valid: invalid.length === 0,
      errors: invalid.map(({ validation, index }) => ({
        fileIndex: index,
        fileName: files[index].name,
        error: validation.error
      }))
    }
  },
}
