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
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TuneIcon from '@mui/icons-material/Tune'
import DownloadIcon from '@mui/icons-material/Download'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import SpeedIcon from '@mui/icons-material/Speed'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import HighQualityIcon from '@mui/icons-material/HighQuality'

export default function AudioEffectsLanding() {
	return (
		<Root elevation={0}>
			<Helmet>
				<title>Edit Audio Online Free – Pitch Shift, Tempo, Normalize & Fade Private</title>
				<meta name="description" content="Free online audio effects: pitch shift, tempo/speed change, normalize loudness, fade in/out, volume gain. Local WebAssembly processing – no uploads, signup or watermark." />
				<meta property="og:title" content="Online Audio Effects – Pitch, Speed, Normalize & Fade (Free & Private)" />
				<meta property="og:description" content="Apply pitch, speed, normalize, fades & gain to audio locally (MP3, WAV, FLAC, OGG, M4A). No uploads, signup or watermark." />
				<meta property="og:image" content="/images/landing/audio-effect-hero.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="/tools/audio/audio-effects-online" />
				<meta property="og:site_name" content="FileApps" />
				<link rel="canonical" href="/tools/audio/audio-effects-online" />
				<script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
			</Helmet>
			<section className='hero-section'>
				<Container maxWidth="lg">
					<Grid container spacing={3} alignItems="center">
						<Grid size={{ xs: 12, md: 6 }} className='hero-text'>
							<Typography variant="h2" component="h1">Online Audio Effects – Pitch, Speed, Normalize & Fade</Typography>
							<Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Pitch shift, tempo change, normalize loudness, fade in/out & gain — processed locally. Free, private & watermark‑free.</Typography>
							<Box display="flex" gap={1}>
								<Button color='info' size='large' href="/tools/audio/effects" variant="contained">Upload</Button>
								<Button size='large' href="/tools/audio/how-to-audio-effects-online" variant="text" sx={{ color: 'text.secondary' }}>How-to Guide</Button>
							</Box>
						</Grid>
						<Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
							<img src='/images/landing/audio-effect-hero.jpg' alt='Audio Effects Editor' title='Audio Effects Editor' loading='lazy' width="auto" height="auto" style={{ filter: 'hue-rotate(-70deg)' }} />
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='why-us'>
				<Container maxWidth="lg">
					<Grid container spacing={3} justifyContent='center' flexGrow={1}>
						<Grid size={12}>
							<Typography variant='h2'>Why Use Our Audio Effects Tool?</Typography>
							<Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<PrivacyTipIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Local & Private</Typography>
								<Typography variant='body1'>WebAssembly processing only.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<GraphicEqIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Free & Clean</Typography>
								<Typography variant='body1'>No signup or watermark.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<FlashOnIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Fast WASM</Typography>
								<Typography variant='body1'>Instant effect rendering.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<MusicNoteIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Format Support</Typography>
								<Typography variant='body1'>MP3, WAV, FLAC, AAC, OGG.</Typography>
							</CardContent></Card>
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
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ bgcolor: 'info.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<CloudUploadIcon />
									</Box>
									<Typography variant='h5' component='h3' gutterBottom>1. Upload</Typography>
									<Typography variant='body1'>Drag & drop audio file.</Typography>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ bgcolor: 'info.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<TuneIcon />
									</Box>
									<Typography variant='h5' component='h3' gutterBottom>2. Choose Effects</Typography>
									<Typography variant='body1'>Pitch, speed, fades, normalize.</Typography>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ bgcolor: 'info.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<GraphicEqIcon />
									</Box>
									<Typography variant='h5' component='h3' gutterBottom>3. Preview</Typography>
									<Typography variant='body1'>Instant local playback.</Typography>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Box sx={{ bgcolor: 'info.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<DownloadIcon />
									</Box>
									<Typography variant='h5' component='h3' gutterBottom>4. Export</Typography>
									<Typography variant='body1'>Download processed audio.</Typography>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='key-features'>
				<Container maxWidth="lg">
					<Grid container spacing={3} justifyContent='center'>
						<Grid size={12}>
							<Typography variant='h2' mb={4}>Key Features</Typography>
							<Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<LibraryMusicIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Pitch Shift</Typography>
								<Typography variant='body1'>Transpose ± semitones.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<SpeedIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Tempo / Speed</Typography>
								<Typography variant='body1'>0.5×–2× range.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<VolumeUpIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Fades</Typography>
								<Typography variant='body1'>In / out smoothing.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<HighQualityIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Normalize Loudness</Typography>
								<Typography variant='body1'>Balanced levels.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<VolumeUpIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Gain Control</Typography>
								<Typography variant='body1'>Boost / reduce.</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
							<Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
								<FlashOnIcon fontSize='large' color='info' />
								<Typography variant='h5' component='h3' gutterBottom>Instant Export</Typography>
								<Typography variant='body1'>Fast & watermark‑free.</Typography>
							</CardContent></Card>
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='use-cases'>
				<Container maxWidth="lg">
					<Typography variant='h2'>Effect Guidance & Use Cases</Typography>
					<Divider sx={{ width: 100, mx: 'auto', my: 2 }} />
					<Grid container spacing={3}>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}><CardContent>
								<Typography variant='h5' component='h3' gutterBottom>Effect Guidance</Typography>
								<Typography component='ul' sx={{ pl: 3, m: 0 }}>
									<li><strong>Pitch:</strong> –7 to +7 natural</li>
									<li><strong>Speed:</strong> 0.5×–2× typical</li>
									<li><strong>Fade:</strong> 0.5–3 s common</li>
									<li><strong>Normalize:</strong> leave ~1 dB</li>
								</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}><CardContent>
								<Typography variant='h5' component='h3' gutterBottom>Popular Tasks</Typography>
								<Typography component='ul' sx={{ pl: 3, m: 0 }}>
									<li>Change key for practice</li>
									<li>Slow tricky parts</li>
									<li>Normalize podcast clips</li>
									<li>Add intro/outro fades</li>
									<li>Boost quiet voice notes</li>
								</Typography>
							</CardContent></Card>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}><CardContent>
								<Typography variant='h5' component='h3' gutterBottom>Who It’s For</Typography>
								<Typography component='ul' sx={{ pl: 3, m: 0 }}>
									<li>Musicians & learners</li>
									<li>Podcasters & editors</li>
									<li>Content creators</li>
									<li>Voice & memo users</li>
									<li>Developers / media teams</li>
								</Typography>
							</CardContent></Card>
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='faq-section'>
				<Container maxWidth="lg">
					<Grid container spacing={3} justifyContent='center' flexGrow={1}>
						<Grid size={12}>
							<Typography variant='h2' mb={4} align='center'>FAQs</Typography>
							<Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
						</Grid>
						<Grid size={{ xs: 12 }}>
							{FAQ_SCHEMA.mainEntity.map((faq, idx) => (
								<Accordion key={idx} square disableGutters elevation={3}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-effects-${idx}-content`} id={`faq-effects-${idx}-header`}>
										<Typography variant='h6' component='h3'>{faq.name}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
									</AccordionDetails>
								</Accordion>
							))}
						</Grid>
					</Grid>
				</Container>
			</section>
			<section className='cta-section'>
				<Container maxWidth="lg">
					<Grid container spacing={3} justifyContent='center' flexGrow={1}>
						<Grid size={12}><Typography variant='h2' align='center'>Ready to enhance your audio?</Typography></Grid>
						<Grid size={12}><Typography variant='h6' component='p' color='common.white'>Apply pitch, speed, fades, normalization & more — all locally.</Typography></Grid>
						<Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
							<Button color='inherit' variant='contained' size='large' href='/tools/audio/effects'>Upload</Button>
							<Button size='large' href='/tools/audio/how-to-audio-effects-online' sx={{ color: 'common.white' }}>How-to Guide</Button>
						</Grid>
					</Grid>
				</Container>
			</section>
		</Root>
	)
}

// JSON-LD FAQ schema (bottom)
const FAQ_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	"mainEntity": [
		{ "@type": "Question", "name": "Is it really free and private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The editor runs completely in your browser using WebAssembly — no uploads, accounts, or watermarks." } },
		{ "@type": "Question", "name": "Can I change pitch and speed together?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — pitch (semitones) and speed (tempo multiplier) can be adjusted in the same session." } },
		{ "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP3, WAV, FLAC, AAC, OGG, M4A (browser-decodable formats)." } },
		{ "@type": "Question", "name": "What’s a safe range for pitch & speed?", "acceptedAnswer": { "@type": "Answer", "text": "Stay within ±7 semitones for natural tone (±12 for stylized). Speed 0.5×–2× suits most practice and content." } },
		{ "@type": "Question", "name": "How do I avoid clipping or distortion?", "acceptedAnswer": { "@type": "Answer", "text": "Normalize first, then add gain and leave about 1 dB peak headroom to prevent clipping." } }
	]
}

// Styled Root at bottom
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
		background: `radial-gradient(circle at 50% 0%, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
		textAlign: 'center',
		'& .MuiTypography-h2': { color: theme.palette.common.white }
	},
	'& .use-cases': {
		paddingBlock: theme.spacing(8),
		'& .MuiTypography-h2': { textAlign: 'center', marginBottom: theme.spacing(2) }
	},
}));
