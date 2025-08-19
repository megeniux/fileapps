import React, { useState, useRef } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

// MUI imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

// Icons
import SubtitlesIcon from '@mui/icons-material/Subtitles'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const ffmpeg = new FFmpeg()
let isFFmpegLoaded = false
const ffmpegRef = { current: ffmpeg }


function BurnCaption() {
    const [file, setFile] = useState<File | null>(null)
    const [subtitleFile, setSubtitleFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [subtitleName, setSubtitleName] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState<string | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const [downloadSize, setDownloadSize] = useState<number | null>(null)
    const [consoleLogs, setConsoleLogs] = useState<string[]>([])
    const [isDragActive, setIsDragActive] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Subtitle style options
    const [fontSize, setFontSize] = useState<number>(24)
    const [fontColor, setFontColor] = useState<string>('#FFFFFF')
    const [outlineColor, setOutlineColor] = useState<string>('#000000')
    const [outlineWidth, setOutlineWidth] = useState<number>(2)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setFile(event.target.files[0])
            setPreviewUrl(URL.createObjectURL(event.target.files[0]))
            setProgress(0)
            setStatus(null)
            setErrorMsg(null)
            setDownloadUrl(null)
            setDownloadSize(null)
            setConsoleLogs([])
        }
    }

    const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setSubtitleFile(event.target.files[0])
            setSubtitleName(event.target.files[0].name)
        }
    }

    const handleRemoveFile = () => {
        setFile(null)
        setPreviewUrl(null)
        setProgress(0)
        setStatus(null)
        setErrorMsg(null)
        setDownloadUrl(null)
        setDownloadSize(null)
        setConsoleLogs([])
    }

    const handleRemoveSubtitle = () => {
        setSubtitleFile(null)
        setSubtitleName(null)
    }

    const handleReset = () => {
        window.location.reload()
    }

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragActive(true)
    }
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragActive(false)
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const selectedFile = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('video/'))
            if (!selectedFile) {
                setErrorMsg('Please select a video file.')
                return
            }
            setFile(selectedFile)
            setPreviewUrl(URL.createObjectURL(selectedFile))
            setProgress(0)
            setStatus(null)
            setErrorMsg(null)
            setDownloadUrl(null)
            setDownloadSize(null)
            setConsoleLogs([])
        }
    }

    // Parse duration from ffmpeg logs
    const parseDuration = (msg: string) => {
        const match = msg.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
        if (match) {
            const [, h, m, s] = match;
            return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
        }
        return 0;
    };

    // Parse current time from ffmpeg logs
    const parseCurrentTime = (msg: string) => {
        const match = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
        if (match) {
            const [, h, m, s] = match;
            return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
        }
        return null;
    };

    // Burn caption handler
    const handleBurn = async () => {
        if (!file) {
            setErrorMsg('Please select a video file.')
            return
        }
        if (!subtitleFile) {
            setErrorMsg('Please select a subtitle file (SRT or VTT).')
            return
        }
        setIsProcessing(true)
        setProgress(0)
        setStatus('Preparing')
        setErrorMsg(null)
        setDownloadUrl(null)
        setDownloadSize(null)
        setConsoleLogs([])

        if (!isFFmpegLoaded) {
            await ffmpeg.load()
            isFFmpegLoaded = true
        }
        ffmpegRef.current = ffmpeg

        const inputFileName = file.name
        const subtitleFileName = subtitleFile.name
        const outputFileName = `captioned_${inputFileName.replace(/\.[^/.]+$/, '')}.mp4`

        // Always use static font from public folder
        const staticFontName = 'arial.ttf'
        const staticFontUrl = '/fonts/Arial/arial.ttf'
        const fontRes = await fetch(staticFontUrl)
        const fontBlob = await fontRes.blob()
        await ffmpeg.writeFile(staticFontName, new Uint8Array(await fontBlob.arrayBuffer()))

        try {
            await ffmpeg.writeFile(inputFileName, await fetchFile(file))
            await ffmpeg.writeFile(subtitleFileName, await fetchFile(subtitleFile))

            let durationParsed = false;
            let vidDuration = 0;
            const logHandler = ({ message }: { message: string }) => {
                if (!durationParsed && message.includes('Duration:')) {
                    vidDuration = parseDuration(message);
                    durationParsed = true;
                }
                const current = parseCurrentTime(message);
                if (current && vidDuration > 0) {
                    setProgress(Math.min((current / vidDuration) * 100, 99.5));
                } else if (message.includes('frame=')) {
                    setProgress(prev => Math.min(prev + 5, 99));
                }
                setConsoleLogs(logs => [...logs, message]);
            };
            ffmpeg.on('log', logHandler);
            setStatus('Burning captions');

            // Build FFmpeg filter string for subtitles
            let style = `FontName=Arial,FontSize=${fontSize},PrimaryColour=&H${outlineColor.replace('#', '')}&,OutlineColour=&H${fontColor.replace('#', '')}&,Outline=${outlineWidth}`
            let filter = `subtitles='${subtitleFileName}':force_style='${style}':fontsdir='.'`

            let args = [
                '-i', inputFileName,
                '-vf', filter,
                '-c:a', 'copy',
                outputFileName
            ]
            await ffmpeg.exec(args)
            setStatus('Finalizing')
            setProgress(99.9)
            const data = await ffmpeg.readFile(outputFileName)
            const blob = new Blob([new Uint8Array(data as any)], { type: 'video/mp4' })
            const url = URL.createObjectURL(blob)
            setDownloadUrl(url)
            setDownloadSize(data.length)
            await ffmpeg.deleteFile(inputFileName)
            await ffmpeg.deleteFile(subtitleFileName)
            await ffmpeg.deleteFile(outputFileName)
            await ffmpeg.deleteFile(staticFontName)
            setProgress(100)
            setStatus('Completed')
            ffmpeg.off('log', logHandler)
        } catch (err:any) {
            setStatus('Failed')
            setConsoleLogs(logs => [...logs, String(err)])
            if (err.message !== 'called FFmpeg.terminate()') {
                setErrorMsg(err instanceof Error ? err.message : String(err))
            }
        } finally {
            setIsProcessing(false)
            setTimeout(() => {
                setProgress(0)
                setStatus(null)
            }, 2000)
        }
    }

    const handleStop = () => {
        ffmpegRef.current?.terminate?.()
        setStatus('Stopped')
        setIsProcessing(false)
        setErrorMsg(null)
    }

    const handleDownload = () => {
        if (downloadUrl && file) {
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = `captioned_${file.name.replace(/\.[^/.]+$/, '')}.mp4`
            a.click()
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000)
        }
    }

    return (
        <Container maxWidth="lg" sx={{ my: 'auto' }}>
            {/* Move error message above Card */}
            {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
            <Card sx={{ p: 1.5 }} elevation={3}>
                <CardContent sx={{ p: 0 }}>
                    <Box display="flex" alignItems="center">
                        <SubtitlesIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                            Burn Captions
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 0.5 }} />
                    <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
                        Upload a video and subtitle file, customize style, and burn captions into your video.
                    </Typography>
                    {/* Upload area */}
                    <Box
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        position="relative"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        width="100%"
                        height={220}
                        borderRadius={1}
                        bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
                        border={isDragActive ? theme => `2px dashed ${theme.palette.primary.main}` : theme => `2px dashed ${theme.palette.divider}`}
                        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
                    >
                        {!file ? (
                            <Box textAlign="center">
                                <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
                                <Typography variant="subtitle2" gutterBottom>
                                    Drag & drop a video file here<br/>or<br/>Click to select
                                </Typography>
                                <Typography color="text.secondary" variant="caption">
                                    Supported: MP4, MOV, AVI, MKV, and more
                                </Typography>
                            </Box>
                        ) : (
                            <Box textAlign="center" width="100%">
                                <video
                                    ref={videoRef}
                                    src={previewUrl || undefined}
                                    controls
                                    style={{ maxWidth: '100%', maxHeight: 220, background: '#000', position: 'relative', zIndex: 10 }}
                                />
                            </Box>
                        )}
                        <input
                            accept="video/*"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                left: 0,
                                top: 0,
                                opacity: 0,
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                            id="burn-caption-video-input"
                            type="file"
                            onChange={handleFileChange}
                            tabIndex={-1}
                        />
                    </Box>
                    {/* Filename and remove button */}
                    {file && (
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="body2" noWrap>
                                {file.name}
                            </Typography>
                            <IconButton size="small" color='error' onClick={handleRemoveFile} sx={{ ml: 1 }}>
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </Box>
                    )}
                    <Box display={isProcessing ? "none" : "flex"} alignItems="center" justifyContent="center" my={2}>
                        <input
                            accept=".srt,.vtt"
                            style={{ display: 'none' }}
                            id="burn-caption-subtitle-input"
                            type="file"
                            onChange={handleSubtitleChange}
                        />
                        <label htmlFor="burn-caption-subtitle-input">
                            <Button variant="contained" component="span" size="small" disabled={isProcessing || !file}>
                                {subtitleFile ? 'Replace Subtitle' : 'Upload Subtitle'}
                            </Button>
                        </label>
                        {subtitleName && (
                            <Typography variant="body2" noWrap sx={{ ml: 2 }}>
                                {subtitleName}
                            </Typography>
                        )}
                        {subtitleFile && (
                            <IconButton size="small" color='error' onClick={handleRemoveSubtitle} sx={{ ml: 1 }}>
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        )}
                    </Box>
                    {/* Show info about static font */}
                    <Box display={isProcessing ? "none" : "flex"} alignItems="center" justifyContent="center" mb={2}>
                        <Typography variant="caption" color="text.secondary">
                            Captions will use Arial font.
                        </Typography>
                    </Box>
                    {/* Style options */}
                    {file && subtitleFile && !isProcessing && (
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 9, sm: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Font Size
                                    <small> ({fontSize}px)</small>
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <IconButton size="small" onClick={() => setFontSize(prev => Math.max(12, prev - 1))}><RemoveIcon /></IconButton>
                                    <Slider
                                        value={fontSize}
                                        min={12}
                                        max={48}
                                        step={1}
                                        onChange={(_, val) => setFontSize(val as number)}
                                        valueLabelDisplay="auto"
                                        size="small"
                                        sx={{ mx: 1, flex: 1 }}
                                    />
                                    <IconButton size="small" onClick={() => setFontSize(prev => Math.min(48, prev + 1))}><AddIcon /></IconButton>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 3, sm: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Font Color
                                </Typography>
                                <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} style={{ width: 40, height: 32, border: 'none', background: 'none' }} />
                            </Grid>
                            <Grid size={{ xs: 3, sm: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Outline Width
                                    <small> ({outlineWidth}px)</small>
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <IconButton size="small" onClick={() => setOutlineWidth(prev => Math.max(0, prev - 1))}><RemoveIcon /></IconButton>
                                    <Slider
                                        value={outlineWidth}
                                        min={0}
                                        max={6}
                                        step={1}
                                        onChange={(_, val) => setOutlineWidth(val as number)}
                                        valueLabelDisplay="auto"
                                        size="small"
                                        sx={{ mx: 1, flex: 1 }}
                                    />
                                    <IconButton size="small" onClick={() => setOutlineWidth(prev => Math.min(6, prev + 1))}><AddIcon /></IconButton>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 9, sm: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Outline Color
                                </Typography>
                                <input type="color" value={outlineColor} onChange={e => setOutlineColor(e.target.value)} style={{ width: 40, height: 32, border: 'none', background: 'none' }} />
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
                <CardActions sx={{ display: !!file && !!subtitleFile ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
                    <Button variant="contained" onClick={handleBurn} disabled={isProcessing || !file || !subtitleFile} size="small">
                        {isProcessing ? 'Burning...' : 'Burn Caption'}
                    </Button>
                    {!isProcessing && (
                        <Button variant="outlined" onClick={handleReset} size="small">
                            Reset
                        </Button>
                    )}
                    {isProcessing && (
                        <Button variant="contained" color="error" onClick={handleStop} size="small">
                            Stop
                        </Button>
                    )}
                    {downloadUrl && downloadSize !== null && (
                        <Button variant="contained" color="success" onClick={handleDownload} size="small">
                            Download ({(downloadSize / (1024 * 1024)).toFixed(2)} MB)
                        </Button>
                    )}
                </CardActions>
                {isProcessing && (
                    <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
                        <LinearProgress color='success' variant="determinate" value={progress} />
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

export default BurnCaption
