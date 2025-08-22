import { Routes, Route } from 'react-router-dom';

// Layouts
import BasicLayout from './components/BasicLayout';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import AboutUs from './pages/About';
import TOS from './pages/Terms';
import PrivacyPolicy from './pages/Policy';

// Tool, Landing and Blog (ordered like Home)
// Video Tools
import VideoConvert from './pages/tools/VideoConvert';
import VideoConvertLanding from './pages/landings/VideoConvertLanding';
import VideoConvertBlog from './pages/blogs/VideoConvertBlog';
import VideoCompression from './pages/tools/VideoCompression';
import VideoCompressionLanding from './pages/landings/VideoCompressionLanding';
import VideoCompressionBlog from './pages/blogs/VideoCompressionBlog';
import VideoResize from './pages/tools/VideoResize';
import VideoResizerLanding from './pages/landings/VideoResizerLanding';
import VideoResizerBlog from './pages/blogs/VideoResizerBlog';
import VideoTrim from './pages/tools/VideoTrim';
import VideoMerge from './pages/tools/VideoMerge';
import VideoMergerLanding from './pages/landings/VideoMergerLanding';
import VideoMergerBlog from './pages/blogs/VideoMergerBlog';
import ExtractAudio from './pages/tools/ExtractAudio';
import ThumbnailGenerator from './pages/tools/ThumbnailGenerator';
import VideoPlayback from './pages/tools/VideoPlayback';
import BurnCaption from './pages/tools/BurnCaption';
import BurnCaptionLanding from './pages/landings/BurnCaptionLanding';
import BurnCaptionsBlog from './pages/blogs/BurnCaptionsBlog';

// Audio Tools
import AudioConvert from './pages/tools/AudioConvert';
import AudioConvertLanding from './pages/landings/AudioConvertLanding';
import AudioConvertBlog from './pages/blogs/AudioConvertBlog';
import AudioTrim from './pages/tools/AudioTrim';
import AudioMerge from './pages/tools/AudioMerge';
import AudioEffects from './pages/tools/AudioEffects';
import AudioEffectsLanding from './pages/landings/AudioEffectsLanding';
import AudioEffectsBlog from './pages/blogs/AudioEffectsBlog';
import AudioPlayback from './pages/tools/AudioPlayback';


import ImageEditor from './pages/tools/ImageConvert';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />

  {/* Video Tools */}
  <Route path="tools/video/convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
  <Route path="tools/video/convert-video-online" element={<BasicLayout><VideoConvertLanding /></BasicLayout>} />
  <Route path="tools/video/how-to-convert-video-online" element={<BasicLayout><VideoConvertBlog /></BasicLayout>} />
  <Route path="tools/video/compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
  <Route path="tools/video/compress-video-online" element={<BasicLayout><VideoCompressionLanding /></BasicLayout>} />
  <Route path="tools/video/how-to-compress-video-online" element={<BasicLayout><VideoCompressionBlog /></BasicLayout>} />
  <Route path="tools/video/resize" element={<BasicLayout><VideoResize /></BasicLayout>} />
  <Route path="tools/video/resize-video-online" element={<BasicLayout><VideoResizerLanding /></BasicLayout>} />
  <Route path="tools/video/how-to-resize-video-online" element={<BasicLayout><VideoResizerBlog /></BasicLayout>} />
  <Route path="tools/video/trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
  <Route path="tools/video/merge" element={<BasicLayout><VideoMerge /></BasicLayout>} />
  <Route path="tools/video/merge-videos-online" element={<BasicLayout><VideoMergerLanding /></BasicLayout>} />
  <Route path="tools/video/how-to-merge-videos-online" element={<BasicLayout><VideoMergerBlog /></BasicLayout>} />
  <Route path="tools/video/extract-audio" element={<BasicLayout><ExtractAudio /></BasicLayout>} />
  <Route path="tools/video/thumbnail" element={<BasicLayout><ThumbnailGenerator /></BasicLayout>} />
  <Route path="tools/video/burn-caption" element={<BasicLayout><BurnCaption /></BasicLayout>} />
  <Route path="tools/video/burn-captions-into-video-online" element={<BasicLayout><BurnCaptionLanding /></BasicLayout>} />
  <Route path="tools/video/how-to-burn-captions-into-video-online" element={<BasicLayout><BurnCaptionsBlog /></BasicLayout>} />
  <Route path="tools/video/playback" element={<BasicLayout><VideoPlayback /></BasicLayout>} />

  {/* Audio Tools */}
  <Route path="tools/audio/convert" element={<BasicLayout><AudioConvert /></BasicLayout>} />
  <Route path="tools/audio/convert-audio-online" element={<BasicLayout><AudioConvertLanding /></BasicLayout>} />
  <Route path="tools/audio/how-to-convert-audio-online" element={<BasicLayout><AudioConvertBlog /></BasicLayout>} />
  <Route path="tools/audio/trim" element={<BasicLayout><AudioTrim /></BasicLayout>} />
  <Route path="tools/audio/merge" element={<BasicLayout><AudioMerge /></BasicLayout>} />
  <Route path="tools/audio/effects" element={<BasicLayout><AudioEffects /></BasicLayout>} />
  <Route path="tools/audio/audio-effects-online" element={<BasicLayout><AudioEffectsLanding /></BasicLayout>} />
  <Route path="tools/audio/how-to-audio-effects-online" element={<BasicLayout><AudioEffectsBlog /></BasicLayout>} />
  <Route path="tools/audio/playback" element={<BasicLayout><AudioPlayback /></BasicLayout>} />

      {/* Image Tools */}
      <Route path="tools/image/convert" element={<BasicLayout><ImageEditor /></BasicLayout>} />

      {/* Other pages */}
      <Route path="about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="terms" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
    </Routes>
  );
}

export default AppRoutes;
