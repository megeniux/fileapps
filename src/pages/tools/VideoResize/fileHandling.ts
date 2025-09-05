/**
 * Validate if the file is a video file
 */
export const validateVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/');
};

/**
 * Handle drag and drop events for file upload
 */
export const handleDragEvents = (
  setIsDragActive: (active: boolean) => void,
  setErrorMsg: (error: string | null) => void,
  handleFileSelect: (file: File) => void
) => {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      
      if (!validateVideoFile(selectedFile)) {
        setErrorMsg('Please select a video file.');
        return;
      }
      
      handleFileSelect(selectedFile);
    }
  };

  return {
    onDragOver,
    onDragLeave,
    onDrop,
  };
};
