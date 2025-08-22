// React import intentionally omitted (new JSX transform)
import { Helmet } from 'react-helmet-async'

// MUI Components (mirroring BurnCaptionLanding structure/style)
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// Icons (from markdown suggestions + reused set)
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShareIcon from '@mui/icons-material/Share';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TuneIcon from '@mui/icons-material/Tune';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import SpeedIcon from '@mui/icons-material/Speed';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PublicIcon from '@mui/icons-material/Public';

const FAQ_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	"mainEntity": [
		{
			"@type": "Question",
			"name": "How does the browser-based audio converter work?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "It uses FFmpeg compiled to WebAssembly running locally in your browser. No audio is uploaded to a server — processing stays on your device for maximum privacy."
			}
		},
		{
			"@type": "Question",
			"name": "Which audio formats are supported?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "MP3, WAV, AAC, FLAC, OGG, and M4A are supported, plus other codecs available through FFmpeg WebAssembly builds."
			}
		},
		{
			"@type": "Question",
			"name": "Can I convert to high quality 320kbps MP3?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Yes. Select the High Quality or 320kbps option when choosing MP3 output to retain maximum perceptual quality."
			}
		},
		{
			"@type": "Question",
			"name": "Is it really free?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Yes — no signup, no credit card, no watermark. You can convert unlimited files directly in your browser."
			}
		},
		{
			"@type": "Question",
			"name": "What if my audio file is very large?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Browser performance depends on memory/CPU. For extremely large or hour‑long files you can first trim or convert to a more efficient format (e.g. from WAV to FLAC) before re‑processing."
			}
		}
	]
}

const Root = styled(Paper)(({ theme }) => ({
	'& img': { maxWidth: '100%' },
	'& .hero-section': {
        minHeight: 500,
		paddingTop: theme.spacing(6),
        '& .hero-image': {
            '& > img': {
                marginBottom: theme.spacing(2)
            }
        },
		[theme.breakpoints.down('md')]: {
			'& .hero-text': { 
                textAlign: 'center', 
                paddingBottom: theme.spacing(6) 
            },
            '& .hero-image': {
                '& > img': {
                    display: 'table',
                    marginInline: 'auto',
                }
            }
		}
	},
	'& .how-it-works': {
		paddingBlock: theme.spacing(8),
		textAlign: 'center',
		'& .MuiTypography-h2': { color: theme.palette.text.primary }
	},
	'& .faq-section': {
		paddingBlock: theme.spacing(8),
		'& .MuiTypography-h2': { color: theme.palette.text.primary },
		'& .MuiAccordionSummary-root': { padding: theme.spacing(0, 2, 0, 2) },
		'& .MuiAccordionDetails-root': { padding: theme.spacing(0, 2, 2, 2) }
	},
	'& .why-us, & .key-features, & .cta-section': {
		paddingBlock: theme.spacing(8),
		background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
		textAlign: 'center',
		'& .MuiTypography-h2': { color: theme.palette.common.white }
	},
}));

export default function AudioConvertLanding() {
	return (
		<Root elevation={0}>
			<Helmet>
				<title>Free Online Audio Converter - Convert Audio to MP3, WAV, AAC, FLAC, OGG</title>
				<meta name="description" content="Convert audio files to MP3, WAV, AAC, FLAC, OGG and more online free. No signup, no uploads, no credit card required. Browser-based audio converter ensures data privacy." />
				<meta name="keywords" content="convert audio to mp3, convert audio to mp3 online free, free online audio converter, wav to mp3 converter, flac to mp3 converter online, ogg to mp3, m4a to mp3 online, browser audio converter, no signup mp3 converter" />
				<meta property="og:title" content="Convert Audio to MP3 & More Online Free (Privacy-First, No Uploads)" />
				<meta property="og:description" content="Fast, free, and private online audio converter. Convert to MP3, WAV, AAC, FLAC, OGG directly in your browser. No uploads, no signups, no watermarks." />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/images/branding/logo-xl.svg" />
				<meta property="og:url" content="https://fileapps.click/tools/audio/convert-landing" />
				<meta property="og:site_name" content="FileApps" />
				<link rel="canonical" href="https://fileapps.click/tools/audio/convert-landing" />
				<script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
			</Helmet>
			<section className='hero-section'>
				<Container maxWidth="lg">
					<Grid container spacing={3} alignItems="center">
						<Grid size={{ xs: 12, md: 6 }} className='hero-text'>
							<Typography variant="h2" component="h1">
								Convert Audio Files Online Free — 100% Private & Secure
							</Typography>
							<Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>
								Easily convert your audio files to MP3, WAV, AAC, FLAC, OGG and more directly in your browser. Choose quality (320kbps, 192kbps, 128kbps, lossless) and convert instantly — no uploads, no watermarks, no sign‑ups required.
							</Typography>
							<Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }} gap={1}>
								<Button color='primary' size='large' href="/tools/audio/convert" variant="contained">Upload Now</Button>
								<Button size='large' href="/tools/audio/convert-blog" variant="text">Read Guide</Button>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
							<img src='/images/landing/audio-convert-hero.jpg' alt='Audio Converter' title='Audio Converter' loading='lazy' width="auto" height="auto" />
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='why-us'>
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						<Grid container size={12}>
							<Grid size={12}>
								<Typography variant='h2'>Why Use Our Online Audio Converter?</Typography>
								<Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
							</Grid>

							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<PrivacyTipIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Privacy First</Typography>
										<Typography variant='body1'>All processing happens locally in your browser — nothing is uploaded.</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<FlashOnIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Free & Fast</Typography>
										<Typography variant='body1'>No signup, no watermark, instant conversions with WASM.</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<LibraryMusicIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Multiple Formats</Typography>
										<Typography variant='body1'>MP3, WAV, AAC, FLAC, OGG, M4A supported.</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<ShareIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Cross Platform</Typography>
										<Typography variant='body1'>Works on Chrome, Firefox, Safari & Edge.</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='how-it-works'>
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						<Grid size={12}>
							<Typography variant='h2'>How It Works</Typography>
							<Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
						</Grid>
						<Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center">
							<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
								<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center' }}>
										<CloudUploadIcon />
									</Box>
									<Box>
										<Typography variant='h5' component='h3'>Upload Audio File</Typography>
										<Typography variant='body1'>Drag & drop or select your file.</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
								<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center' }}>
										<SwapHorizIcon />
									</Box>
									<Box>
										<Typography variant='h5' component='h3'>Choose Output Format</Typography>
										<Typography variant='body1'>Select MP3, WAV, AAC, FLAC, OGG, M4A.</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
								<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center' }}>
										<TuneIcon />
									</Box>
									<Box>
										<Typography variant='h5' component='h3'>Select Quality</Typography>
										<Typography variant='body1'>128k, 192k, 256k, 320k or lossless.</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
								<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center' }}>
										<SpeedIcon />
									</Box>
									<Box>
										<Typography variant='h5' component='h3'>Convert Audio</Typography>
										<Typography variant='body1'>Powered by FFmpeg WASM instantly.</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
								<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center' }}>
										<DownloadIcon />
									</Box>
									<Box>
										<Typography variant='h5' component='h3'>Download File</Typography>
										<Typography variant='body1'>Export converted audio instantly.</Typography>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='key-features'>
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						<Grid container size={12} justifyContent="center">
							<Grid size={12}>
								<Typography variant='h2' mb={4}>Key Features</Typography>
								<Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<UploadFileIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Drag & Drop</Typography>
										<Typography variant='body1'>Quickly import audio files.</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<LibraryMusicIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Major Formats</Typography>
										<Typography variant='body1'>MP3, WAV, AAC, FLAC, OGG, M4A support.</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<HighQualityIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Custom Bitrate</Typography>
										<Typography variant='body1'>128k to 320k or lossless output.</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<SpeedIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Fast WASM Engine</Typography>
										<Typography variant='body1'>Efficient FFmpeg WebAssembly processing.</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<AudioFileIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Lossless Options</Typography>
										<Typography variant='body1'>Convert to WAV or FLAC without quality loss.</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
								<Card sx={{ height: '100%' }}>
									<CardContent sx={{ p: 2 }}>
										<PublicIcon fontSize='large' color="primary" />
										<Typography variant='h5' component="h3" gutterBottom>Cross-Browser</Typography>
										<Typography variant='body1'>Works on modern desktop & mobile browsers.</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='faq-section'>
				<Container maxWidth="lg">
					<Grid container spacing={3} justifyContent="center">
						<Grid size={12}>
							<Typography variant='h2' mb={4} align='center'>FAQs</Typography>
							<Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
						</Grid>
						{FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
							<Grid key={idx} size={{ xs: 12 }}>
								<Accordion square disableGutters elevation={3} sx={{ '& .MuiAccordionSummary-root': { px: 1, py: 0.5 }, '& .MuiAccordionDetails-root': { px: 1, py: 1 } }}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-audio-${idx}-content`} id={`faq-audio-${idx}-header`}>
										<Typography variant='h6' component="h3">{faq.name}</Typography>
									</AccordionSummary>
									<AccordionDetails sx={{ p: 2 }}>
										<Typography variant='body1'>{faq.acceptedAnswer?.text}</Typography>
									</AccordionDetails>
								</Accordion>
							</Grid>
						))}
					</Grid>
				</Container>
			</section>
			<section className='cta-section'>
				<Container maxWidth="lg">
					<Grid container spacing={3} justifyContent="center">
						<Grid size={12}>
							<Typography variant='h2' align='center'>Ready to convert audio?</Typography>
						</Grid>
						<Grid size={12}>
							<Typography variant='h6' component="p" color='common.white'>
								Upload your audio file now — it’s free, fast and private.
							</Typography>
						</Grid>
						<Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
							<Button color='inherit' variant="contained" size='large' href="/tools/audio/convert">Upload Now</Button>
							<Button size='large' href="/tools/audio/convert-blog" sx={{ color: 'common.white' }}>Read Guide</Button>
						</Grid>
					</Grid>
				</Container>
			</section>
		</Root>
	)
}

