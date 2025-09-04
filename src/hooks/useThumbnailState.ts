import { useState, useRef, useCallback } from 'react'
import { validateVideoFile, createPreviewUrl, cleanupPreviewUrl } from '../utils/fileHandling'
import { thumbnailSizeOptions, getSafeDimensions } from '../pages/tools/ThumbnailGenerator/constants'
import type { SelectChangeEvent } from '@mui/material/Select'

export const useThumbnailState = () => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [width, setWidth] = useState<number>(1280)
  const [height, setHeight] = useState<number>(720)
  const [sizePreset, setSizePreset] = useState('1280x720')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [mode, setMode] = useState(0) // 0: Single, 1: Scrub, 2: Frames
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(1)
  const [scrubInterval, setScrubInterval] = useState(1)
  const [frameInterval, setFrameInterval] = useState(10)
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [isDragActive, setIsDragActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const resetState = useCallback(() => {
    cleanupPreviewUrl(previewUrl)
    setFile(null)
    setPreviewUrl(null)
    setDuration(0)
    setTime(0)
    setStartTime(0)
    setEndTime(1)
    setProgress(0)
    setStatus(null)
    setErrorMsg(null)
    setThumbnailUrl(null)
    setThumbnails([])
    setConsoleLogs([])
  }, [previewUrl])

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!validateVideoFile(selectedFile)) {
      setErrorMsg('Please select a video file.')
      return
    }

    resetState()
    setFile(selectedFile)
    setPreviewUrl(createPreviewUrl(selectedFile))
  }, [resetState])

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      const dur = videoRef.current.duration
      // Only update width/height if using custom preset
      if (sizePreset === 'custom') {
        setWidth(videoRef.current.videoWidth)
        setHeight(videoRef.current.videoHeight)
      }
      setDuration(dur)
      setTime(0)
      setStartTime(0)
      setEndTime(Math.floor(dur))
    }
  }, [sizePreset])

  const handleSizePresetChange = useCallback((event: SelectChangeEvent) => {
    const presetValue = event.target.value
    setSizePreset(presetValue)
    
    const selectedPreset = thumbnailSizeOptions.find(option => option.value === presetValue)
    if (selectedPreset && selectedPreset.width && selectedPreset.height) {
      setWidth(selectedPreset.width)
      setHeight(selectedPreset.height)
    }
  }, [])

  const handleWidthChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value)
    if (!isNaN(val) && val > 0) {
      const { safeWidth } = getSafeDimensions(val, height)
      setWidth(safeWidth)
    }
  }, [height])

  const handleHeightChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value)
    if (!isNaN(val) && val > 0) {
      const { safeHeight } = getSafeDimensions(width, val)
      setHeight(safeHeight)
    }
  }, [width])

  return {
    // State
    file,
    previewUrl,
    duration,
    time,
    width,
    height,
    sizePreset,
    isProcessing,
    progress,
    status,
    errorMsg,
    thumbnailUrl,
    mode,
    startTime,
    endTime,
    scrubInterval,
    frameInterval,
    thumbnails,
    consoleLogs,
    isDragActive,
    videoRef,
    
    // Setters
    setFile,
    setTime,
    setWidth,
    setHeight,
    setSizePreset,
    setIsProcessing,
    setProgress,
    setStatus,
    setErrorMsg,
    setThumbnailUrl,
    setMode,
    setStartTime,
    setEndTime,
    setScrubInterval,
    setFrameInterval,
    setThumbnails,
    setConsoleLogs,
    setIsDragActive,
    
    // Actions
    resetState,
    handleFileSelect,
    handleLoadedMetadata,
    handleSizePresetChange,
    handleWidthChange,
    handleHeightChange
  }
}
