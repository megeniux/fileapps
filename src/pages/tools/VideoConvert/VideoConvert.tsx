import { Helmet } from 'react-helmet-async';
import { formatBytes } from '../../../helpers';

// MUI
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Global Components
import PerformanceInfoDialog from '../../../components/PerformanceInfoDialog';

// Components and utilities from VideoConvert folder
import FileUploadArea from './FileUploadArea';
import ConversionSettings from './ConversionSettings';
import ProgressDisplay from './ProgressDisplay';
import InfoPopovers from './InfoPopovers';
import { useVideoConverter } from './useVideoConverter';

function VideoConvert() {
  const {
    // State
    file,
    previewUrl,
    outputFormat,
    videoCodec,
    audioCodec,
    width,
    height,
    fps,
    crf,
    preset,
    audioBitrate,
    resolutionRatio,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    crfAnchor,
    presetAnchor,
    isDragActive,

    // Refs
    videoRef,
    fileInputRef,

    // Event handlers
    handleFileChange,
    handleRemoveFile,
    handleLoadedMetadata,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDownload,
    handleCrfInfoClick,
    handleCrfInfoClose,
    handlePresetInfoClick,
    handlePresetInfoClose,
    handlePerformanceDialogClose,
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleFormatChange,
    handleReset,
    handleVideoCodecChange,
    handleAudioCodecChange,
    handleFpsChange,
    handleCrfChange,
    handlePresetChange,
    handleAudioBitrateChange,

    // Processing
    processVideo,
    stopProcessing,
  } = useVideoConverter();

  return (
    <>
      <Helmet>
        <title>Convert Videos Online For Free | No Signup, No Limit</title>
        <meta name="description" content="Convert Videos Online For Free convert to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta property="og:title" content="Convert Videos Online For Free | No Signup, No Limit" />
        <meta property="og:description" content="Convert Videos Online For Free convert to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta property="og:image" content="/images/landing/video-convert-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/convert" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/convert" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h2" component="h1" fontWeight="600"> Convert Videos Online For Free </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" my={2}> Convert Videos Online For Free convert to MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free. </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }}>
            <img src="/images/landing/video-convert-hero.jpg" alt="Video Convert Icon" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%' }} />
          </Grid>
        </Grid>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent sx={{ p: 0 }}>
            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              videoRef={videoRef}
              fileInputRef={fileInputRef}
              isDragActive={isDragActive}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
              onLoadedMetadata={handleLoadedMetadata}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            {file && (
              <ConversionSettings
                outputFormat={outputFormat}
                videoCodec={videoCodec}
                audioCodec={audioCodec}
                width={width}
                height={height}
                fps={fps}
                crf={crf}
                preset={preset}
                audioBitrate={audioBitrate}
                resolutionRatio={resolutionRatio}
                onFormatChange={handleFormatChange}
                onVideoCodecChange={handleVideoCodecChange}
                onAudioCodecChange={handleAudioCodecChange}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                onFpsChange={handleFpsChange}
                onCrfChange={handleCrfChange}
                onPresetChange={handlePresetChange}
                onAudioBitrateChange={handleAudioBitrateChange}
                onRatioChange={handleRatioChange}
                onCrfInfoClick={handleCrfInfoClick}
                onPresetInfoClick={handlePresetInfoClick}
              />
            )}
          </CardContent>
          <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={processVideo} disabled={isProcessing || !file}>
              {isProcessing ? 'Converting' : 'Convert'}
            </Button>
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            )}
            {isProcessing && (
              <Button color="error" variant='contained' onClick={stopProcessing} disabled={!isProcessing}>
                Stop
              </Button>
            )}
            {downloadUrl && downloadSize !== null && (
              <Button color="success" variant='contained' onClick={handleDownload}>
                Download ({formatBytes(downloadSize)})
              </Button>
            )}
          </CardActions>

          {isProcessing && (<ProgressDisplay progress={progress} status={status} consoleLogs={consoleLogs} />)}
          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        </Card>
        <Grid container spacing={3} mt={5} justifyContent='center' flexGrow={1}>
          <Grid size={12}>
            <Typography variant='h2' mb={4} align='center'>FAQs</Typography>
            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
              <Accordion key={idx} square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-vc-${idx}-content`} id={`faq-vc-${idx}-header`}>
                  <Typography variant='h6' component='h3'>{faq.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
        <InfoPopovers
          crfAnchor={crfAnchor}
          presetAnchor={presetAnchor}
          onCrfInfoClose={handleCrfInfoClose}
          onPresetInfoClose={handlePresetInfoClose}
        />

        <PerformanceInfoDialog
          open={false}
          onClose={handlePerformanceDialogClose}
        />
      </Container>
    </>
  );
}

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does this online video converter work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg WASM inside your browser – no uploads, no server processing." } },
    { "@type": "Question", "name": "Which video formats can I convert?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, MKV, AVI, WebM, FLV, and more." } },
    { "@type": "Question", "name": "Can I change video resolution and FPS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – set custom resolution and FPS during conversion." } },
    { "@type": "Question", "name": "Is this tool free and private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – completely free, no signup, no watermark, and 100% browser-based for privacy." } },
    { "@type": "Question", "name": "Does it work on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – works on Android and iOS with modern browsers." } }
  ]
}

export default VideoConvert;