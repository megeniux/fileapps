import { Routes, Route } from 'react-router-dom';
import BasicLayout from './components/BasicLayout';
import Home from './pages/Home';
import VideoCompression from './pages/tools/VideoCompression';
import Contact from './pages/Contact';
import AboutUs from './pages/About';
import TOS from './pages/TOS';
import PrivacyPolicy from './pages/PrivacyPolicy';
import VideoConvert from './pages/tools/VideoConvert';
import VideoResize from './pages/tools/VideoResize';
import VideoTrim from './pages/tools/VideoTrim';
import VideoMerge from './pages/tools/VideoMerge';
import ExtractAudio from './pages/tools/ExtractAudio';
import ThumbnailGenerator from './pages/tools/ThumbnailGenerator';
import VideoPlayback from './pages/tools/VideoPlayback';
import BurnCaption from './pages/tools/BurnCaption';

import ImageConvert from './pages/tools/ImageConvert';

import AudioPlayback from './pages/tools/AudioPlayback';
import AudioConvert from './pages/tools/AudioConvert';
import AudioTrim from './pages/tools/AudioTrim';
import AudioMerge from './pages/tools/AudioMerge';
import AudioEffects from './pages/tools/AudioEffects';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />
      

      {/* Audio Tools */}
      <Route path="tools/audio-convert" element={<BasicLayout><AudioConvert /></BasicLayout>} />
      <Route path="tools/audio-trim" element={<BasicLayout><AudioTrim /></BasicLayout>} />
      <Route path="tools/audio-playback" element={<BasicLayout><AudioPlayback /></BasicLayout>} />
      <Route path="tools/audio-merge" element={<BasicLayout><AudioMerge /></BasicLayout>} />
      <Route path="tools/audio-effects" element={<BasicLayout><AudioEffects /></BasicLayout>} />

      {/* Video Tools */}
      <Route path="tools/video-compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
      <Route path="tools/video-convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
      <Route path="tools/video-resize" element={<BasicLayout><VideoResize /></BasicLayout>} />
      <Route path="tools/video-trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
      <Route path="tools/video-merge" element={<BasicLayout><VideoMerge /></BasicLayout>} />
      <Route path="tools/video-thumbnail" element={<BasicLayout><ThumbnailGenerator /></BasicLayout>} />
      <Route path="tools/video-extract-audio" element={<BasicLayout><ExtractAudio /></BasicLayout>} />
      <Route path="tools/video-playback" element={<BasicLayout><VideoPlayback /></BasicLayout>} />
      <Route path="tools/video-burn-caption" element={<BasicLayout><BurnCaption /></BasicLayout>} />

      {/* Image Tools */}
      <Route path="tools/image-convert" element={<BasicLayout><ImageConvert /></BasicLayout>} />

      {/* Other pages */}
      <Route path="about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="terms" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
    </Routes>
  );
}

export default AppRoutes;
