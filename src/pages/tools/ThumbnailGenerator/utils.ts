import { useRef, useCallback } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'

export const useFFmpeg = () => {
  const ffmpegRef = useRef<FFmpeg>(new FFmpeg())
  const isLoadedRef = useRef(false)

  const ensureReady = useCallback(async () => {
    if (!isLoadedRef.current || !ffmpegRef.current) {
      if (!ffmpegRef.current) {
        ffmpegRef.current = new FFmpeg()
      }
      await ffmpegRef.current.load()
      isLoadedRef.current = true
    }
    return ffmpegRef.current
  }, [])

  const reset = useCallback(async () => {
    try {
      if (ffmpegRef.current) {
        ffmpegRef.current.terminate()
      }
    } catch (error) {
      console.warn('Error terminating FFmpeg:', error)
    }
    ffmpegRef.current = new FFmpeg()
    isLoadedRef.current = false
  }, [])

  const terminate = useCallback(() => {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate()
      isLoadedRef.current = false
    }
  }, [])

  return {
    ffmpeg: ffmpegRef.current,
    ensureReady,
    reset,
    terminate,
    isLoaded: isLoadedRef.current
  }
}
