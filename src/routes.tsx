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
      <Route path="audio-convert" element={<BasicLayout><AudioConvert /></BasicLayout>} />
      <Route path="audio-trim" element={<BasicLayout><AudioTrim /></BasicLayout>} />
      <Route path="audio-playback" element={<BasicLayout><AudioPlayback /></BasicLayout>} />
      <Route path="audio-merge" element={<BasicLayout><AudioMerge /></BasicLayout>} />
      <Route path="audio-effects" element={<BasicLayout><AudioEffects /></BasicLayout>} />

      {/* Video Tools */}
      <Route path="video-compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
      <Route path="video-convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
      <Route path="video-resize" element={<BasicLayout><VideoResize /></BasicLayout>} />
      <Route path="video-trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
      <Route path="video-merge" element={<BasicLayout><VideoMerge /></BasicLayout>} />
      <Route path="video-thumbnail" element={<BasicLayout><ThumbnailGenerator /></BasicLayout>} />
      <Route path="video-extract-audio" element={<BasicLayout><ExtractAudio /></BasicLayout>} />
      <Route path="video-playback" element={<BasicLayout><VideoPlayback /></BasicLayout>} />
      <Route path="video-burn-caption" element={<BasicLayout><BurnCaption /></BasicLayout>} />

      {/* Image Tools */}
      <Route path="image-convert" element={<BasicLayout><ImageConvert /></BasicLayout>} />
      
      {/* Other pages */}
      <Route path="about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="terms" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
    </Routes>
  );
}

export default AppRoutes;
