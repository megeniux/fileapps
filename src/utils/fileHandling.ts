export const validateVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/')
}

export const handleDragEvents = (
  setIsDragActive: (active: boolean) => void,
  setErrorMsg: (msg: string | null) => void,
  onFileSelect: (file: File) => void
) => ({
  onDragOver: (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  },
  onDragLeave: (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
  },
  onDrop: (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0]
      if (!validateVideoFile(selectedFile)) {
        setErrorMsg('Please select a video file.')
        return
      }
      onFileSelect(selectedFile)
    }
  }
})

export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file)
}

export const cleanupPreviewUrl = (url: string | null) => {
  if (url) {
    URL.revokeObjectURL(url)
  }
}
