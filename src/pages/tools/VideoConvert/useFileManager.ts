import { useCallback } from 'react';

interface UseFileManagerProps {
  previewUrl: string | null;
  downloadUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setDownloadUrl: (url: string | null) => void;
  setDownloadSize: (size: number | null) => void;
  setProgress: (progress: number) => void;
  setStatus: (status: string | null) => void;
  setConsoleLogs: (logs: string[]) => void;
  setErrorMsg: (error: string | null) => void;
  durationRef: React.MutableRefObject<number>;
}

export function useFileManager({
  previewUrl,
  downloadUrl,
  fileInputRef,
  setFile,
  setPreviewUrl,
  setDownloadUrl,
  setDownloadSize,
  setProgress,
  setStatus,
  setConsoleLogs,
  setErrorMsg,
  durationRef,
}: UseFileManagerProps) {

  const handleFileSelect = useCallback((selectedFile: File) => {
    // Clean up previous URL to prevent memory leak
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    durationRef.current = 0;
  }, [previewUrl, setFile, setPreviewUrl, setDownloadUrl, setDownloadSize, setProgress, setStatus, setConsoleLogs, setErrorMsg, durationRef]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      handleFileSelect(event.target.files[0]);
    }
  }, [handleFileSelect]);

  const handleRemoveFile = useCallback(() => {
    // Clean up URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    // Reset the file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    durationRef.current = 0;
  }, [previewUrl, downloadUrl, fileInputRef, setFile, setPreviewUrl, setDownloadUrl, setDownloadSize, setProgress, setStatus, setConsoleLogs, setErrorMsg, durationRef]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (!selectedFile.type.startsWith('video/') && !selectedFile.type.startsWith('audio/')) {
        setErrorMsg('Please select a video or audio file.');
        return;
      }

      // Reset the file input to ensure consistent state
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      handleFileSelect(selectedFile);
    }
  }, [fileInputRef, handleFileSelect, setErrorMsg]);

  const handleDownload = useCallback((file: File | null, outputFormat: string) => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `converted_${file.name.replace(/\.[^/.]+$/, '')}.${outputFormat}`;
      a.click();
      // Clean up URL after download
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  }, [downloadUrl]);

  return {
    handleFileChange,
    handleRemoveFile,
    handleDrop,
    handleDownload,
  };
}
