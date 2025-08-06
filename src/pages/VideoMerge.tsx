import React, { useState, useRef } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'

// Icons
import MergeTypeIcon from '@mui/icons-material/MergeType'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import AddIcon from '@mui/icons-material/Add'

// FFmpeg
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

const ffmpeg = new FFmpeg()
let isFFmpegLoaded = false

function VideoMerge() {
  const [files, setFiles] = useState<File[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadSize, setDownloadSize] = useState<number | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prev => [...prev, ...(event.target.files ? Array.from(event.target.files) : [])])
      setErrorMsg(null)
    }
  }

  // Remove file
  const handleRemove = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
  }

  // Move file up
  const handleMoveUp = (idx: number) => {
    if (idx <= 0 || idx >= files.length) return
    setFiles(prev => {
      const arr = [...prev]
      const temp = arr[idx - 1]
      arr[idx - 1] = arr[idx]
      arr[idx] = temp
      return arr
    })
  }

  // Move file down
  const handleMoveDown = (idx: number) => {
    if (idx < 0 || idx >= files.length - 1) return
    setFiles(prev => {
      const arr = [...prev]
      const temp = arr[idx + 1]
      arr[idx + 1] = arr[idx]
      arr[idx] = temp
      return arr
    })
  }

  // Replace file
  const handleReplace = (idx: number) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/*'
    input.onchange = (e: any) => {
      if (e.target.files?.[0]) {
        setFiles(prev => prev.map((f, i) => i === idx ? e.target.files[0] : f))
      }
    }
    input.click()
  }

  // Open file input for adding
  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  // Merge videos using FFmpeg
  const handleMerge = async () => {
    if (files.length < 2) return
    setIsProcessing(true)
    setProgress(0)
    setStatus('Preparing')
    setErrorMsg(null)
    setDownloadUrl(null)
    setDownloadSize(null)
    setConsoleLogs([])

    try {
      if (!isFFmpegLoaded) {
        await ffmpeg.load()
        isFFmpegLoaded = true
      }
      // Write all files to FS
      for (const file of files) {
        await ffmpeg.writeFile(file.name, await fetchFile(file))
      }
      // Create concat list file
      const concatList = files.map(f => `file '${f.name.replace(/'/g, "'\\''")}'`).join('\n')
      await ffmpeg.writeFile('concat.txt', new TextEncoder().encode(concatList))

      // Logging
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message])
        if (message.includes('frame=')) {
          setProgress(prev => Math.min(prev + 5, 99))
        }
      }
      ffmpeg.on('log', logHandler)

      setStatus('Merging')
      const outputFileName = 'merged_output.mp4'
      await ffmpeg.exec([
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat.txt',
        '-c', 'copy',
        outputFileName
      ])
      setStatus('Finalizing')
      setProgress(99.9)
      const data = await ffmpeg.readFile(outputFileName)
      const url = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }))
      setDownloadUrl(url)
      setDownloadSize(data.length)
      // Clean up
      for (const file of files) {
        await ffmpeg.deleteFile(file.name)
      }
      await ffmpeg.deleteFile('concat.txt')
      await ffmpeg.deleteFile(outputFileName)
      setProgress(100)
      setStatus('Completed')
      ffmpeg.off('log', logHandler)
    } catch (err) {
      setStatus('Failed')
      setConsoleLogs(logs => [...logs, String(err)])
      setErrorMsg(err instanceof Error ? err.message : String(err))
    } finally {
      setIsProcessing(false)
      setTimeout(() => {
        setProgress(0)
        setStatus(null)
      }, 2000)
    }
  }

  // Stop merge process
  const handleStop = () => {
    ffmpeg.terminate()
    setStatus('Stopped')
    setIsProcessing(false)
    setErrorMsg(null)
  }

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = 'merged_output.mp4'
      a.click()
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000)
    }
  }

  // Memoized video preview table
  const VideoTable = React.useMemo(() => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Preview</TableCell>
            <TableCell>Filename</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, idx) => (
            <TableRow key={file.name + idx}>
              <TableCell>
                <video
                  src={URL.createObjectURL(file)}
                  style={{ width: 80, height: 48, background: '#000' }}
                  controls={false}
                  muted
                  preload="metadata"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">{file.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <IconButton color="info" size="small" onClick={() => handleMoveUp(idx)} title="Move down" disabled={idx === 0 || isProcessing}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton color="info" size="small" onClick={() => handleMoveDown(idx)} title="Move up" disabled={idx === files.length - 1 || isProcessing}>
                  <ArrowDownwardIcon />
                </IconButton>
                <IconButton color="info" size="small" onClick={() => handleReplace(idx)} title="Replace video" disabled={isProcessing}>
                  <SwapHorizIcon />
                </IconButton>
                <IconButton color="info" size="small" onClick={() => handleRemove(idx)} title="Delete video" disabled={isProcessing}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {files.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body2" color="text.secondary">
                  No videos selected. Click "Add Videos" to upload.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  ), [files, isProcessing])

  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Card sx={{ px: 2, py: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Box display="flex" flexDirection="column" alignItems="center">
            <MergeTypeIcon color="info" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h5" color='info' gutterBottom>
              Merge Videos
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Upload multiple videos, arrange their order, and merge them into one file.
            </Typography>
          </Box>
          <Box my={2} display="flex" justifyContent="center" alignItems="center" gap={2}>
            <Button
              variant="contained"
              color="info"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              disabled={isProcessing}
            >
              Add Videos
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Box>
          {files.length ? VideoTable : ""}
        </CardContent>
        <CardActions sx={{ display: files.length ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button
            variant="contained"
            color="info"
            disabled={files.length < 2 || isProcessing}
            onClick={handleMerge}
          >
            {isProcessing ? 'Merging' : 'Merge'}
          </Button>
          {isProcessing && (
            <Button variant="contained" color="error" onClick={handleStop}>
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button variant="outlined" color="success" onClick={handleDownload}>
              Download ({(downloadSize / (1024 * 1024)).toFixed(2)} MB)
            </Button>
          )}
        </CardActions>
        {isProcessing && (
          <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
            <LinearProgress color='info' variant="determinate" value={progress} />
            <Typography variant="body2" my={1}>{`${status} (${progress.toFixed(1)}%)`}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
            </Typography>
          </Box>
        )}
      </Card>
    </Container>
  )
}

export default VideoMerge
