import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';

// MUI imports
import { styled, alpha, useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Icons
import ImageIcon from '@mui/icons-material/Image';
import SecurityIcon from '@mui/icons-material/Security';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import DevicesIcon from '@mui/icons-material/Devices';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import SpeedIcon from '@mui/icons-material/Speed';
import CropIcon from '@mui/icons-material/Crop';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import BrushIcon from '@mui/icons-material/Brush';

// Component imports
import FileUploadArea from './FileUploadArea';
import SettingsPanel from './SettingsPanel';
import ProgressDisplay from './ProgressDisplay';
import FileInfoDisplay from '../../../components/shared/FileInfoDisplay';
import { useImageConverter } from './useImageConverter';

function ImageConvert() {
  const theme = useTheme();

  const {
    // State
    file,
    previewUrl,
    width,
    height,
    maintainAspectRatio,
    quality,
    format,
    errorMsg,
    isProcessing,
    progress,
    status,
    downloadUrl,
    downloadSize,
    originalDimensions,
    isDragActive,
    crop,
    rotate,
    grayscale,
    blur,
    outputName,
    flipH,
    flipV,
    brightness,
    contrast,
    saturation,
    isSelectingCrop,
    drawingCrop,
    displaySize,

    // Setters
    setDisplaySize,
    setMaintainAspectRatio,
    setQuality,
    setBlur,
    setRotate,
    setGrayscale,
    setOriginalDimensions,

    // Event handlers
    handleFileChange,
    handleCropMouseDown,
    handleCropMouseMove,
    handleCropMouseUp,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveFile,
    handleReset,
    handleWidthInput,
    handleHeightInput,
    handleFormatChange,
    handleApplyCrop,
    handleResetCrop,
    handleOutputNameChange,
    handleFlipH,
    handleFlipV,
    handleBrightnessChange,
    handleContrastChange,
    handleSaturationChange,
    handleConvert,
    handleStop,

    // Refs
    fileInputRef,
  } = useImageConverter();

  const handleDownload = () => {
    if (downloadUrl && file) {
      const fileExtension = format === 'original'
        ? file.name.split('.').pop()?.toLowerCase() || 'jpg'
        : format;
      const name = outputName
        ? `${outputName}.${fileExtension}`
        : `${file.name.replace(/\.[^/.]+$/, '')}.${fileExtension}`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = name;
      a.click();
    }
  };

  // Simple slider change handlers
  const handleQualityChange = (value: number) => setQuality(value);
  const handleBlurChange = (value: number) => setBlur(value);
  const handleRotateChange = (value: number) => setRotate(value);
  const handleAspectRatioToggle = () => setMaintainAspectRatio(m => !m);
  const handleGrayscaleChange = (e: React.ChangeEvent<HTMLInputElement>) => setGrayscale(e.target.checked);

  // Smooth scroll to tool section
  const scrollToTool = () => {
    const toolSection = document.querySelector('.tool');
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      title: '100% Private & Secure',
      description: 'All image processing happens locally in your browser. Your files never leave your device.',
      icon: <SecurityIcon fontSize="large" color="success" />
    },
    {
      title: 'Advanced Editing Tools',
      description: 'Crop, resize, rotate, flip, and apply filters with precision control and real-time preview.',
      icon: <BrushIcon fontSize="large" color="primary" />
    },
    {
      title: 'No Quality Loss',
      description: 'Advanced algorithms maintain image quality during conversion and editing operations.',
      icon: <HighQualityIcon fontSize="large" color="info" />
    },
    {
      title: 'Lightning Fast',
      description: 'Powered by WebAssembly for near-native performance directly in your browser.',
      icon: <SpeedIcon fontSize="large" color="secondary" />
    },
    {
      title: 'Always Free',
      description: 'Convert and edit unlimited images with no restrictions, watermarks, or hidden fees.',
      icon: <MoneyOffIcon fontSize="large" color="warning" />
    },
    {
      title: 'All Devices Supported',
      description: 'Works on Windows, Mac, Linux, iOS, and Android. No software installation needed.',
      icon: <DevicesIcon fontSize="large" color="error" />
    }
  ];

  const relatedTools = [
    {
      title: 'Video Converter',
      description: 'Convert between different video formats',
      icon: <PlayArrowIcon color="secondary" />,
      link: '/tools/video/convert'
    },
    {
      title: 'Video Trimmer',
      description: 'Cut and trim video files precisely',
      icon: <CropIcon color="secondary" />,
      link: '/tools/video/trim'
    },
    {
      title: 'Video Resizer',
      description: 'Resize and scale video dimensions',
      icon: <AspectRatioIcon color="secondary" />,
      link: '/tools/video/resize'
    },
    {
      title: 'Thumbnail Generator',
      description: 'Generate thumbnails from videos',
      icon: <ImageIcon color="secondary" />,
      link: '/tools/image/thumbnail'
    }
  ];

  return (
    <Root>
      <Helmet>
        <title>Image Converter & Editor Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Free online image converter and editor. Convert between JPG, PNG, WebP, GIF formats. Resize, crop, rotate, and apply filters to images. Local processing with no watermarks."
        />
        <meta property="og:title" content={`Image Converter & Editor Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/image-converter-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/convert" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Image Converter & Editor Online For Free | ${APP_INFO.name}`} />
        <meta name="twitter:description" content="Free online image converter and editor. Convert between JPG, PNG, WebP, GIF formats. Resize, crop, rotate, and apply filters to images. Local processing with no watermarks." />
        <meta name="twitter:image" content="/images/landing/image-converter-hero.png" />
        <link rel="canonical" href="https://fileapps.click/tools/convert" />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What image formats can I convert between?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our image converter supports all major formats including JPG, PNG, WebP, GIF, BMP, TIFF, and many more. You can convert between any supported formats while maintaining quality."
                }
              },
              {
                "@type": "Question",
                "name": "Can I edit images before converting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our tool includes advanced editing features like cropping, resizing, rotating, flipping, brightness/contrast adjustment, saturation control, blur effects, and grayscale conversion."
                }
              },
              {
                "@type": "Question",
                "name": "Are my images kept private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All image processing happens locally in your browser using WebAssembly. Your images never leave your device or get uploaded to any server. This ensures complete privacy and security."
                }
              },
              {
                "@type": "Question",
                "name": "Does conversion reduce image quality?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our advanced algorithms are designed to maintain image quality during conversion. For lossy formats like JPG, you can control the quality level. Lossless formats like PNG preserve original quality completely."
                }
              },
              {
                "@type": "Question",
                "name": "Can I batch convert multiple images?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Currently, our tool processes one image at a time for optimal quality and control. However, you can quickly process multiple images by repeating the simple upload, edit, and convert workflow."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className='hero'>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', pt: { xs: 10, md: 20 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 6,
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Box sx={{ order: { xs: 2, md: 1 } }}>
              <Stack direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} spacing={2} sx={{ mb: 4 }}>
                <Chip
                  label="100% Private"
                  color="success"
                  size="medium"
                  icon={<SecurityIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Chip
                  label="No Upload"
                  color="info"
                  size="medium"
                  icon={<CloudOffIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Chip
                  label="Always Free"
                  color="warning"
                  size="medium"
                  icon={<MoneyOffIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                />
              </Stack>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                <Typography
                  component="span"
                  className='gradient-text-primary'
                  sx={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit'
                  }}
                >
                  Image Converter & Editor
                </Typography>
                {' '}Online For Free
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 4,
                  lineHeight: 1.4,
                  fontWeight: 400,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Free online image converter and editor. Convert between JPG, PNG, WebP, GIF formats. Resize, crop, rotate, and apply filters to images. Local processing with no watermarks.
              </Typography>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 6, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  color='warning'
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={scrollToTool}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  Start Converting
                </Button>
                <Button
                  color='warning'
                  component={RouterLink}
                  to="/about"
                  variant="outlined"
                  size="large"
                  startIcon={<InfoIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem'
                  }}
                >
                  Learn More
                </Button>
              </Stack>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.success.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  maxWidth: { xs: '100%', md: 'fit-content' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  Supports JPG, PNG, WebP, GIF, BMP, TIFF and more
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ textAlign: 'center', order: { xs: 1, md: 2 } }}>
              <img
                src="/images/landing/image-converter-hero.png"
                alt="Image Converter Tool Interface"
                style={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  borderRadius: 16
                }}
              />
            </Box>
          </Box>
        </Container>
      </section>

      {/* Tool Section */}
      <section className="tool">
        <Container maxWidth="lg" sx={{ pt: 20, pb: 10 }}>
          <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <CardContent sx={{ p: 4 }}>
              <FileUploadArea
                file={file}
                isDragActive={isDragActive}
                onFileChange={handleFileChange}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                fileInputRef={fileInputRef}
              />

              {file && (
                <Box flex={1} minHeight={320} display="flex" alignItems="center" justifyContent="center" position="relative" bgcolor="action.hover" borderRadius={1}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      ref={(ref) => {
                        if (ref && ref.complete && ref.naturalWidth > 0) {
                          const imgWidth = ref.naturalWidth;
                          const imgHeight = ref.naturalHeight;
                          
                          // Only set dimensions if they haven't been set yet
                          if (!originalDimensions) {
                            setOriginalDimensions({ width: imgWidth, height: imgHeight });
                          }
                          
                          // Initialize width/height inputs only when empty
                          if (!width) {
                            handleWidthInput({ target: { value: String(imgWidth) } } as any);
                          }
                          if (!height) {
                            handleHeightInput({ target: { value: String(imgHeight) } } as any);
                          }
                          
                          // Get displayed size for overlay scaling - use setTimeout to avoid infinite updates
                          const updateDisplaySize = () => {
                            if (ref && (displaySize.width !== ref.width || displaySize.height !== ref.height)) {
                              setDisplaySize({
                                width: ref.width,
                                height: ref.height
                              });
                            }
                          };
                          
                          // Use setTimeout to prevent infinite updates
                          setTimeout(updateDisplaySize, 0);
                        }
                      }}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        const imgWidth = img.naturalWidth;
                        const imgHeight = img.naturalHeight;
                        
                        // Only set dimensions if they haven't been set yet
                        if (!originalDimensions) {
                          setOriginalDimensions({ width: imgWidth, height: imgHeight });
                        }
                        
                        // Get displayed size for overlay scaling
                        setTimeout(() => {
                          if (img && (displaySize.width !== img.width || displaySize.height !== img.height)) {
                            setDisplaySize({
                              width: img.width,
                              height: img.height
                            });
                          }
                        }, 0);
                      }}
                      src={previewUrl || ''}
                      alt="Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: 480,
                        width: 'auto',
                        height: 'auto',
                        display: 'block',
                        filter: `
                          ${grayscale ? 'grayscale(1)' : ''}
                          ${blur ? `blur(${blur}px)` : ''}
                          brightness(${brightness}%)
                          contrast(${contrast}%)
                          saturate(${saturation}%)
                        `,
                        transform: `
                          rotate(${rotate}deg)
                          scaleX(${flipH ? -1 : 1})
                          scaleY(${flipV ? -1 : 1})
                        `
                      } as React.CSSProperties}
                    />
                    {/* Crop selection overlay */}
                    {originalDimensions && displaySize.width > 0 && displaySize.height > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          left: 0, top: 0, width: displaySize.width, height: displaySize.height,
                          pointerEvents: 'auto',
                          cursor: 'crosshair',
                          zIndex: 3,
                          background: isSelectingCrop ? 'rgba(0,0,0,0.05)' : 'transparent'
                        }}
                        onMouseDown={handleCropMouseDown}
                        onTouchStart={handleCropMouseDown}
                        onMouseMove={isSelectingCrop ? handleCropMouseMove : undefined}
                        onTouchMove={isSelectingCrop ? handleCropMouseMove : undefined}
                        onMouseUp={handleCropMouseUp}
                        onTouchEnd={handleCropMouseUp}
                      >
                        {(drawingCrop && drawingCrop.w > 0 && drawingCrop.h > 0)
                          ? (
                            <div
                              style={{
                                position: 'absolute',
                                left: `${(drawingCrop.x / originalDimensions.width) * displaySize.width}px`,
                                top: `${(drawingCrop.y / originalDimensions.height) * displaySize.height}px`,
                                width: `${(drawingCrop.w / originalDimensions.width) * displaySize.width}px`,
                                height: `${(drawingCrop.h / originalDimensions.height) * displaySize.height}px`,
                                border: '2px dashed #1976d2',
                                background: 'rgba(25, 118, 210, 0.1)',
                                pointerEvents: 'none'
                              }}
                            />
                          )
                          : (crop.w > 0 && crop.h > 0 && (
                            <div
                              style={{
                                position: 'absolute',
                                left: `${(crop.x / originalDimensions.width) * displaySize.width}px`,
                                top: `${(crop.y / originalDimensions.height) * displaySize.height}px`,
                                width: `${(crop.w / originalDimensions.width) * displaySize.width}px`,
                                height: `${(crop.h / originalDimensions.height) * displaySize.height}px`,
                                border: '2px dashed #1976d2',
                                background: 'rgba(25, 118, 210, 0.1)',
                                pointerEvents: 'none'
                              }}
                            />
                          ))
                        }
                      </div>
                    )}
                  </Box>
                </Box>
              )}

              {/* File information and remove button */}
              {file && (
                <FileInfoDisplay 
                  file={file} 
                  onRemove={handleRemoveFile}
                  additionalInfo={originalDimensions ? `(${originalDimensions.width}x${originalDimensions.height})` : undefined}
                  isProcessing={isProcessing}
                />
              )}

              {file && (
                <SettingsPanel
                  crop={crop}
                  onApplyCrop={handleApplyCrop}
                  onResetCrop={handleResetCrop}
                  width={width}
                  height={height}
                  maintainAspectRatio={maintainAspectRatio}
                  onWidthChange={handleWidthInput}
                  onHeightChange={handleHeightInput}
                  onAspectRatioToggle={handleAspectRatioToggle}
                  outputName={outputName}
                  format={format}
                  onOutputNameChange={handleOutputNameChange}
                  onFormatChange={handleFormatChange}
                  quality={quality}
                  blur={blur}
                  brightness={brightness}
                  contrast={contrast}
                  saturation={saturation}
                  rotate={rotate}
                  flipH={flipH}
                  flipV={flipV}
                  grayscale={grayscale}
                  onQualityChange={handleQualityChange}
                  onBlurChange={handleBlurChange}
                  onBrightnessChange={handleBrightnessChange}
                  onContrastChange={handleContrastChange}
                  onSaturationChange={handleSaturationChange}
                  onRotateChange={handleRotateChange}
                  onFlipHChange={handleFlipH}
                  onFlipVChange={handleFlipV}
                  onGrayscaleChange={handleGrayscaleChange}
                  isProcessing={isProcessing}
                />
              )}
            </CardContent>

            <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 4, mt: 2, gap: 1 }}>
              <Button variant="contained" onClick={handleConvert} disabled={isProcessing || !file || (!width && !height)}>
                {isProcessing ? 'Converting' : 'Convert'}
              </Button>
              {!isProcessing && (
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              )}
              {isProcessing && (
                <Button color="error" variant='contained' onClick={handleStop} disabled={!isProcessing}>
                  Stop
                </Button>
              )}
              {downloadUrl && downloadSize !== null && (
                <Button color="success" variant='contained' onClick={handleDownload}>
                  Download ({formatBytes(downloadSize)})
                </Button>
              )}
            </CardActions>

            <ProgressDisplay
              isProcessing={isProcessing}
              progress={progress}
              status={status}
            />
          </Card>

          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Why Choose Our Image Converter?
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 4
            }}
          >
            {benefits.map((benefit, index) => (
              <Card key={index} elevation={0} sx={{ height: '100%', bgcolor: alpha(theme.palette.background.paper, 0.5), backdropFilter: 'blur(5px)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[4] } }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            How It Works
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 4
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.25),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography variant="h4" fontWeight={700} color="primary">1</Typography>
              </Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>Upload Image</Typography>
              <Typography variant="body2" color="text.secondary">
                Select your image file or drag & drop it into the converter
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.secondary.main, 0.25),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography variant="h4" fontWeight={700} color="secondary">2</Typography>
              </Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>Edit & Configure</Typography>
              <Typography variant="body2" color="text.secondary">
                Crop, resize, apply filters, and choose your output format
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.success.main, 0.25),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography variant="h4" fontWeight={700} color="success">3</Typography>
              </Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>Download</Typography>
              <Typography variant="body2" color="text.secondary">
                Convert and download your processed image file
              </Typography>
            </Box>
          </Box>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            Frequently Asked Questions
          </Typography>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>What image formats can I convert between?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our image converter supports all major formats including JPG, PNG, WebP, GIF, BMP, TIFF, and many more.
                You can convert between any supported formats while maintaining quality.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I edit images before converting?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Our tool includes advanced editing features like cropping, resizing, rotating, flipping, 
                brightness/contrast adjustment, saturation control, blur effects, and grayscale conversion.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Are my images kept private?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! All image processing happens locally in your browser using WebAssembly. Your images never leave
                your device or get uploaded to any server. This ensures complete privacy and security.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Does conversion reduce image quality?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our advanced algorithms are designed to maintain image quality during conversion. For lossy formats like JPG, 
                you can control the quality level. Lossless formats like PNG preserve original quality completely.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>Can I batch convert multiple images?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Currently, our tool processes one image at a time for optimal quality and control. However, you can quickly 
                process multiple images by repeating the simple upload, edit, and convert workflow.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </section>

      {/* Related Tools Section */}
      <section className="related-tools">
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
            More Media Tools
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3
            }}
          >
            {relatedTools.map((tool, index) => (
              <Card
                key={index}
                component={RouterLink}
                to={tool.link}
                elevation={0}
                sx={{
                  width: '100%',
                  height: '100%',
                  textDecoration: 'none',
                  background: 'transparent',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                    borderColor: theme.palette.secondary.main
                  }
                }}
              >
                <CardContent sx={{
                  height: '100%',
                  background: alpha(theme.palette.background.paper, 0.5),
                  p: 3,
                  textAlign: 'center'
                }}>
                  <Box sx={{ mb: 2 }}>
                    {tool.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {tool.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tool.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="cta">
        <Container maxWidth="md" sx={{ pb: 10 }}>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              color: 'white',
              borderRadius: 3
            }}
          >
            <ImageIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Ready to Convert Your Images?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start converting and editing your images now with our free, secure, and powerful tool.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => fileInputRef.current?.click()}
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': { bgcolor: alpha('#fff', 0.9) },
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
              startIcon={<PlayArrowIcon />}
            >
              Convert Images Now
            </Button>
          </Paper>
        </Container>
      </section>
    </Root>
  );
}

// Styled components
const Root = styled('div')(() => ({
  '& .hero': {
    overflow: 'hidden',
  },
}));

export default ImageConvert;
