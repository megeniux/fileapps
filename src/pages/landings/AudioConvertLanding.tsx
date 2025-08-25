// General Imports
import { Helmet } from 'react-helmet-async'
// MUI Components
import { styled } from '@mui/material/styles'
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
// MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ShareIcon from '@mui/icons-material/Share'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TuneIcon from '@mui/icons-material/Tune'
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import SpeedIcon from '@mui/icons-material/Speed'
import AudioFileIcon from '@mui/icons-material/AudioFile'
import PublicIcon from '@mui/icons-material/Public'

// Component moved above constants
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
				<meta property="og:image" content="/images/landing/audio-convert-hero.jpg" />
				<meta property="og:url" content="/tools/audio/convert-audio-online" />
				<meta property="og:site_name" content="FileApps" />
				<link rel="canonical" href="/tools/audio/convert-audio-online" />
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
								<Button color='primary' size='large' href="/tools/audio/convert" variant="contained">Upload</Button>
								<Button size='large' href="/tools/audio/how-to-convert-audio-online" variant="text">Learn More</Button>
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
					<Grid container spacing={3} justifyContent='center'>
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
						<Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center" flexGrow={1}>
							<Grid size={{ xs: 12, sm: 6, md: 4 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<CloudUploadIcon />
									</Box>
									<Typography variant='h5' component='h3' gutterBottom>1. Upload Files</Typography>
									<Typography variant='body1'>Drag & drop MP3, WAV, FLAC, OGG, M4A, AAC.</Typography>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, md: 4 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<TuneIcon />
									</Box>
									<Typography variant='h5' component='h3' gutterBottom>2. Choose Format & Quality</Typography>
									<Typography variant='body1'>Set target (MP3, WAV, AAC, FLAC, OGG) + bitrate / lossless.</Typography>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, md: 4 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<DownloadIcon />
									</Box>
									<Typography variant='h5' component='h3' gutterBottom>3. Convert & Download</Typography>
									<Typography variant='body1'>Instant, private — no uploads, no watermark.</Typography>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='key-features'>
				<Container maxWidth="lg">
					<Grid container spacing={3} justifyContent="center">
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
			<section className='use-cases'>
				<Container maxWidth="lg">
					<Typography variant='h2'>Popular Conversions & Use Cases</Typography>
					<Divider sx={{ width: 100, mx: 'auto', my: 2 }} />
					<Grid container spacing={3}>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}>
								<CardContent>
									<Typography variant='h5' component='h3' gutterBottom>Popular Conversions</Typography>
									<Typography component='ul' sx={{ pl: 3, m: 0 }}>
										<li>WAV → MP3</li>
										<li>FLAC → MP3</li>
										<li>OGG → MP3</li>
										<li>M4A → MP3</li>
										<li>AAC → MP3</li>
										<li>WMA → MP3</li>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}>
								<CardContent>
									<Typography variant='h5' component='h3' gutterBottom>Extras & Features</Typography>
									<Typography component='ul' sx={{ pl: 3, m: 0 }}>
										<li>320 kbps high quality</li>
										<li>Lossless FLAC / WAV</li>
										<li>Batch conversion</li>
										<li>Fade & sample rate</li>
										<li>Client-side privacy</li>
										<li>Small voice note output</li>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}>
								<CardContent>
									<Typography variant='h5' component='h3' gutterBottom>Who It’s For</Typography>
									<Typography component='ul' sx={{ pl: 3, m: 0 }}>
										<li>Musicians & producers</li>
										<li>Podcasters & narrators</li>
										<li>Everyday WAV → MP3 users</li>
										<li>Voice & memo creators</li>
										<li>Developers / media teams</li>
									</Typography>
								</CardContent>
							</Card>
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
						<Grid size={{ xs: 12 }}>
							<Accordion square disableGutters elevation={3}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6' component="h3">Is AudioConvert really free and safe?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>Absolutely — it’s completely free, with no hidden fees or limitations. All conversions happen in your browser for your privacy.</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion square disableGutters elevation={3}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6' component="h3">Can I convert WAV to MP3 online for free?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>Yes—AudioConvert supports converting WAV to MP3, as well as to formats like FLAC, OGG, AAC, M4A.</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion square disableGutters elevation={3}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6' component="h3">Does it support bulk audio conversion?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>Yes, you can convert multiple files at once using the batch upload feature.</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion square disableGutters elevation={3}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6' component="h3">What about audio quality control?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>You can select quality up to 320 kbps, choose lossless conversion, and adjust sample rate or add fade in/out effects.</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion square disableGutters elevation={3}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6' component="h3">Do I need to register or upload files to your server?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>Nope—no account needed and no file ever leaves your browser. It's a privacy-first, client-side audio converter.</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion square disableGutters elevation={3}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6' component="h3">Will files have watermarks or branding?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>No, converted audio files come clean—no watermarks, no audio branding, no extra modifications.</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion square disableGutters elevation={3}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6' component="h3">What formats are supported?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>Supports MP3, WAV, AAC, FLAC, OGG, M4A, WMA, AIFF, etc.</Typography>
								</AccordionDetails>
							</Accordion>
						</Grid>
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
							<Button color='inherit' variant="contained" size='large' href="/tools/audio/convert">Upload</Button>
							<Button size='large' href="/tools/audio/how-to-convert-audio-online" sx={{ color: 'common.white' }}>Learn More</Button>
						</Grid>
					</Grid>
				</Container>
			</section>
		</Root>
	)
}

// Constants moved to bottom
const FAQ_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	"mainEntity": [
		{ "@type": "Question", "name": "Is AudioConvert really free and safe?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely — it’s completely free, with no hidden fees or limitations. All conversions happen in your browser for your privacy." } },
		{ "@type": "Question", "name": "Can I convert WAV to MP3 online for free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—AudioConvert supports converting WAV to MP3, as well as to formats like FLAC, OGG, AAC, M4A." } },
		{ "@type": "Question", "name": "Does it support bulk audio conversion?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can convert multiple files at once using the batch upload feature." } },
		{ "@type": "Question", "name": "What about audio quality control?", "acceptedAnswer": { "@type": "Answer", "text": "You can select quality up to 320 kbps, choose lossless conversion, and adjust sample rate or add fade in/out effects." } },
		{ "@type": "Question", "name": "Do I need to register or upload files to your server?", "acceptedAnswer": { "@type": "Answer", "text": "Nope—no account needed and no file ever leaves your browser. It's a privacy-first, client-side audio converter." } },
		{ "@type": "Question", "name": "Will files have watermarks or branding?", "acceptedAnswer": { "@type": "Answer", "text": "No, converted audio files come clean—no watermarks, no audio branding, no extra modifications." } },
		{ "@type": "Question", "name": "What formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "Supports MP3, WAV, AAC, FLAC, OGG, M4A, WMA, AIFF, etc." } }
	]
}

const Root = styled(Paper)(({ theme }) => ({
	'& img': { maxWidth: '100%' },
	'& .hero-section': {
		display: 'flex',
		alignItems: 'center',
		minHeight: 500,
		'& .hero-image': { '& > img': { marginBottom: theme.spacing(2) } },
		[theme.breakpoints.down('md')]: {
			'& .hero-text': { textAlign: 'center', paddingBottom: theme.spacing(6) },
			'& .hero-image': { '& > img': { display: 'table', marginInline: 'auto' } }
		}
	},
	'& .how-it-works': {
		paddingBlock: theme.spacing(8),
		textAlign: 'center',
		'& .MuiTypography-h2': { color: theme.palette.text.primary }
	},
	'& .faq-section': {
		paddingBlock: theme.spacing(8),
		background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
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
	'& .use-cases': {
		paddingBlock: theme.spacing(8),
		'& .MuiTypography-h2': { textAlign: 'center', marginBottom: theme.spacing(2) }
	},
}))
