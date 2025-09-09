import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';

// MUI
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Components
import FileUploadArea from './FileUploadArea';
import SettingsPanel from './SettingsPanel';
import ProgressDisplay from './ProgressDisplay';

// Hook
import { useImageConverter } from './useImageConverter';

function ImageConvert() {
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

  return (
    <>
      <Helmet>
        <title>Image Converter & Editor Online For Free | {APP_INFO.name}</title>
        <meta
          name="description"
          property="og:description"
          content="Free online image converter and editor. Convert between JPG, PNG, WebP, GIF formats. Resize, crop, rotate, and apply filters to images. Local processing with no watermarks."
        />
        <meta property="og:title" content={`Image Converter & Editor Online For Free | ${APP_INFO.name}`} />
        <meta property="og:image" content="/images/landing/image-converter-hero.jpg" />
      <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:url" content="https://fileapps.click/tools/convert" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/tools/convert" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>

        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h2" component="h1" fontWeight="600"> Image Converter & Editor Online </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Free online image converter and editor. Convert between JPG, PNG, WebP, GIF formats. Resize, crop, rotate, and apply filters to images. Local processing with no watermarks. </Typography>
              </Grid>
              <Grid container size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <img src="/images/landing/image-converter-hero.jpg" alt="Image Convert" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%', maxHeight: 300 }} />
              </Grid>
            </Grid>

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

            {/* Filename and remove button */}
            {file && (
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="body2" noWrap>
                  {file.name} ({formatBytes(file.size)})
                </Typography>
                {originalDimensions &&
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    ({originalDimensions.width}x{originalDimensions.height})
                  </Typography>
                }
                <IconButton onClick={handleRemoveFile} color="error" sx={{ ml: 1 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
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

          <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
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

        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
      </Container>
    </>
  );
}

export default ImageConvert;
