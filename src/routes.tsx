import { Routes, Route } from 'react-router-dom';
import BasicLayout from './components/BasicLayout';
import Home from './pages/Home';
import VideoCompression from './pages/tools/VideoCompression';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import TOS from './pages/TOS';
import PrivacyPolicy from './pages/PrivacyPolicy';
import VideoConvert from './pages/tools/VideoConvert';
import VideoResize from './pages/tools/VideoResize';
import VideoTrim from './pages/tools/VideoTrim';
import VideoMerge from './pages/tools/VideoMerge';
import ExtractAudio from './pages/tools/ExtractAudio';
import ThumbnailGenerator from './pages/tools/ThumbnailGenerator';
import AudioConvert from './pages/tools/AudioConvert';
import AudioTrim from './pages/tools/AudioTrim';
import ImageResize from './pages/tools/ImageResize';
import AudioPlayback from './pages/tools/AudioPlayback';
import VideoPlayback from './pages/tools/VideoPlayback';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />
      

      {/* Audio Tools */}
      <Route path="audio-convert" element={<BasicLayout><AudioConvert /></BasicLayout>} />
      <Route path="audio-trim" element={<BasicLayout><AudioTrim /></BasicLayout>} />
      <Route path="audio-playback" element={<BasicLayout><AudioPlayback /></BasicLayout>} />
      <Route path="extract-audio" element={<BasicLayout><ExtractAudio /></BasicLayout>} />

      {/* Video Tools */}
      <Route path="video-playback" element={<BasicLayout><VideoPlayback /></BasicLayout>} />
      <Route path="compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
      <Route path="convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
      <Route path="resize" element={<BasicLayout><VideoResize /></BasicLayout>} />
      <Route path="trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
      <Route path="merge" element={<BasicLayout><VideoMerge /></BasicLayout>} />
      <Route path="thumbnail" element={<BasicLayout><ThumbnailGenerator /></BasicLayout>} />

      {/* Image Tools */}
      <Route path="image-resize" element={<BasicLayout><ImageResize /></BasicLayout>} />
      
      {/* Other pages */}
      <Route path="about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="terms" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
    </Routes>
  );
}

export default AppRoutes;
