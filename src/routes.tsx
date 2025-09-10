import { Routes, Route } from 'react-router-dom';

// Layouts
import BasicLayout from './components/BasicLayout';

// Main Pages
import Home from './pages/Home';
import AboutUs from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/404';
import PrivacyPolicy from './pages/Policy';
import TOS from './pages/Terms';

// Audio Tools
import AudioConvert from './pages/tools/AudioConvert/AudioConvert';
import AudioEffects from './pages/tools/AudioEffects/AudioEffects';
import AudioMerge from './pages/tools/AudioMerge/AudioMerge';
import AudioPlayback from './pages/tools/AudioPlayback/AudioPlayback';
import AudioTrim from './pages/tools/AudioTrim/AudioTrim';

// Image Tools
import ImageEditor from './pages/tools/ImageConvert/ImageConvert';
import ThumbnailGenerator from './pages/tools/ThumbnailGenerator/ThumbnailGenerator';

// Video Tools
import BurnCaption from './pages/tools/BurnCaption/BurnCaption';
import ExtractAudio from './pages/tools/ExtractAudio/ExtractAudio';
import VideoCompression from './pages/tools/VideoCompression/VideoCompression';
import VideoConvert from './pages/tools/VideoConvert/VideoConvert';
import VideoMerge from './pages/tools/VideoMerge/VideoMerge';
import VideoPlayback from './pages/tools/VideoPlayback/VideoPlayback';
import VideoResize from './pages/tools/VideoResize/VideoResize';
import VideoTrim from './pages/tools/VideoTrim/VideoTrim';

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
