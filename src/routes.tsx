import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import BasicLayout from './components/BasicLayout';

// Main Pages
const AboutUs = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/404'));
const PrivacyPolicy = lazy(() => import('./pages/Policy'));
const TOS = lazy(() => import('./pages/Terms'));

// Audio Tools
const AudioConvert = lazy(() => import('./pages/tools/AudioConvert/AudioConvert'));
const AudioEffects = lazy(() => import('./pages/tools/AudioEffects/AudioEffects'));
const AudioMerge = lazy(() => import('./pages/tools/AudioMerge/AudioMerge'));
const AudioPlayback = lazy(() => import('./pages/tools/AudioPlayback/AudioPlayback'));
const AudioTrim = lazy(() => import('./pages/tools/AudioTrim/AudioTrim'));

// Image Tools
const ImageEditor = lazy(() => import('./pages/tools/ImageConvert/ImageConvert'));
const ThumbnailGenerator = lazy(() => import('./pages/tools/ThumbnailGenerator/ThumbnailGenerator'));

// Video Tools
const BurnCaption = lazy(() => import('./pages/tools/BurnCaption/BurnCaption'));
const ExtractAudio = lazy(() => import('./pages/tools/ExtractAudio/ExtractAudio'));
const VideoCompression = lazy(() => import('./pages/tools/VideoCompression/VideoCompression'));
const VideoConvert = lazy(() => import('./pages/tools/VideoConvert/VideoConvert'));
const VideoMerge = lazy(() => import('./pages/tools/VideoMerge/VideoMerge'));
const VideoPlayback = lazy(() => import('./pages/tools/VideoPlayback/VideoPlayback'));
const VideoResize = lazy(() => import('./pages/tools/VideoResize/VideoResize'));
const VideoTrim = lazy(() => import('./pages/tools/VideoTrim/VideoTrim'));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />

      {/* Video Tools */}
      <Route path="tools/video/convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
      <Route path="tools/video/compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
      <Route path="tools/video/resize" element={<BasicLayout><VideoResize /></BasicLayout>} />
      <Route path="tools/video/trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
      <Route path="tools/video/merge" element={<BasicLayout><VideoMerge /></BasicLayout>} />
      <Route path="tools/video/extract-audio" element={<BasicLayout><ExtractAudio /></BasicLayout>} />
      <Route path="tools/video/playback" element={<BasicLayout><VideoPlayback /></BasicLayout>} />
      <Route path="tools/video/burn-captions" element={<BasicLayout><BurnCaption /></BasicLayout>} />

      {/* Audio Tools */}
      <Route path="tools/audio/convert" element={<BasicLayout><AudioConvert /></BasicLayout>} />
      <Route path="tools/audio/trim" element={<BasicLayout><AudioTrim /></BasicLayout>} />
      <Route path="tools/audio/merge" element={<BasicLayout><AudioMerge /></BasicLayout>} />
      <Route path="tools/audio/effects" element={<BasicLayout><AudioEffects /></BasicLayout>} />
      <Route path="tools/audio/playback" element={<BasicLayout><AudioPlayback /></BasicLayout>} />

      {/* Image Tools */}
      <Route path="tools/image/convert" element={<BasicLayout><ImageEditor /></BasicLayout>} />
      <Route path="tools/image/thumbnail" element={<BasicLayout><ThumbnailGenerator /></BasicLayout>} />

      {/* Other pages */}
      <Route path="about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="terms" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
      <Route path="*" element={<BasicLayout><NotFound /></BasicLayout>} />

    </Routes>
  );
}

export default AppRoutes;
