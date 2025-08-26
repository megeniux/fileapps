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
const AudioConvert = lazy(() => import('./pages/tools/AudioConvert'));
const AudioEffects = lazy(() => import('./pages/tools/AudioEffects'));
const AudioMerge = lazy(() => import('./pages/tools/AudioMerge'));
const AudioPlayback = lazy(() => import('./pages/tools/AudioPlayback'));
const AudioTrim = lazy(() => import('./pages/tools/AudioTrim'));

// Audio Blogs
const AudioConvertBlog = lazy(() => import('./pages/blogs/AudioConvertBlog'));
const AudioEffectsBlog = lazy(() => import('./pages/blogs/AudioEffectsBlog'));
const AudioMergerBlog = lazy(() => import('./pages/blogs/AudioMergerBlog'));
const AudioPlaybackBlog = lazy(() => import('./pages/blogs/AudioPlaybackBlog'));
const AudioTrimBlog = lazy(() => import('./pages/blogs/AudioTrimBlog'));

// Audio Landings
const AudioConvertLanding = lazy(() => import('./pages/landings/AudioConvertLanding'));
const AudioEffectsLanding = lazy(() => import('./pages/landings/AudioEffectsLanding'));
const AudioMergerLanding = lazy(() => import('./pages/landings/AudioMergerLanding'));
const AudioPlaybackLanding = lazy(() => import('./pages/landings/AudioPlaybackLanding'));
const AudioTrimLanding = lazy(() => import('./pages/landings/AudioTrimLanding'));

// Image Tools
const ImageEditor = lazy(() => import('./pages/tools/ImageConvert'));
const ThumbnailGenerator = lazy(() => import('./pages/tools/ThumbnailGenerator'));

// Image Blogs
const ImageConverterBlog = lazy(() => import('./pages/blogs/ImageConverterBlog'));
const ThumbnailGeneratorBlog = lazy(() => import('./pages/blogs/ThumbnailGeneratorBlog'));

// Image Landings
const ImageConverterLanding = lazy(() => import('./pages/landings/ImageConverterLanding'));
const ThumbnailGeneratorLanding = lazy(() => import('./pages/landings/ThumbnailGeneratorLanding'));

// Video Tools
const BurnCaption = lazy(() => import('./pages/tools/BurnCaption'));
const ExtractAudio = lazy(() => import('./pages/tools/ExtractAudio'));
const VideoCompression = lazy(() => import('./pages/tools/VideoCompression'));
const VideoConvert = lazy(() => import('./pages/tools/VideoConvert'));
const VideoMerge = lazy(() => import('./pages/tools/VideoMerge'));
const VideoPlayback = lazy(() => import('./pages/tools/VideoPlayback'));
const VideoResize = lazy(() => import('./pages/tools/VideoResize'));
const VideoTrim = lazy(() => import('./pages/tools/VideoTrim'));

// Video Blogs
const BurnCaptionsBlog = lazy(() => import('./pages/blogs/BurnCaptionsBlog'));
const ExtractAudioBlog = lazy(() => import('./pages/blogs/ExtractAudioBlog'));
const VideoCompressionBlog = lazy(() => import('./pages/blogs/VideoCompressionBlog'));
const VideoConvertBlog = lazy(() => import('./pages/blogs/VideoConvertBlog'));
const VideoMergerBlog = lazy(() => import('./pages/blogs/VideoMergerBlog'));
const VideoPlaybackBlog = lazy(() => import('./pages/blogs/VideoPlaybackBlog'));
const VideoResizerBlog = lazy(() => import('./pages/blogs/VideoResizerBlog'));
const VideoTrimBlog = lazy(() => import('./pages/blogs/VideoTrimBlog'));

// Video Landings
const BurnCaptionLanding = lazy(() => import('./pages/landings/BurnCaptionLanding'));
const ExtractAudioLanding = lazy(() => import('./pages/landings/ExtractAudioLanding'));
const VideoCompressionLanding = lazy(() => import('./pages/landings/VideoCompressionLanding'));
const VideoConvertLanding = lazy(() => import('./pages/landings/VideoConvertLanding'));
const VideoMergerLanding = lazy(() => import('./pages/landings/VideoMergerLanding'));
const VideoPlaybackLanding = lazy(() => import('./pages/landings/VideoPlaybackLanding'));
const VideoResizerLanding = lazy(() => import('./pages/landings/VideoResizerLanding'));
const VideoTrimLanding = lazy(() => import('./pages/landings/VideoTrimLanding'));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />

      {/* Video Tools */}
      {/* Convert */}
      <Route path="tools/video/convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
      <Route path="tools/video/convert-video-online" element={<BasicLayout><VideoConvertLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-convert-video-online" element={<BasicLayout><VideoConvertBlog /></BasicLayout>} />

      {/* Compress */}
      <Route path="tools/video/compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
      <Route path="tools/video/compress-video-online" element={<BasicLayout><VideoCompressionLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-compress-video-online" element={<BasicLayout><VideoCompressionBlog /></BasicLayout>} />

      {/* Resize */}
      <Route path="tools/video/resize" element={<BasicLayout><VideoResize /></BasicLayout>} />
      <Route path="tools/video/resize-video-online" element={<BasicLayout><VideoResizerLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-resize-video-online" element={<BasicLayout><VideoResizerBlog /></BasicLayout>} />

      {/* Trim */}
      <Route path="tools/video/trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
      <Route path="tools/video/trim-video-online" element={<BasicLayout><VideoTrimLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-trim-video-online" element={<BasicLayout><VideoTrimBlog /></BasicLayout>} />

      {/* Merge */}
      <Route path="tools/video/merge" element={<BasicLayout><VideoMerge /></BasicLayout>} />
      <Route path="tools/video/merge-videos-online" element={<BasicLayout><VideoMergerLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-merge-videos-online" element={<BasicLayout><VideoMergerBlog /></BasicLayout>} />

      {/* Extract Audio */}
      <Route path="tools/video/extract-audio" element={<BasicLayout><ExtractAudio /></BasicLayout>} />
      <Route path="tools/video/extract-audio-from-video" element={<BasicLayout><ExtractAudioLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-extract-audio-from-video" element={<BasicLayout><ExtractAudioBlog /></BasicLayout>} />

      {/* Playback Speed */}
      <Route path="tools/video/playback" element={<BasicLayout><VideoPlayback /></BasicLayout>} />
      <Route path="tools/video/video-playback-speed-editor" element={<BasicLayout><VideoPlaybackLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-video-playback-speed-editor" element={<BasicLayout><VideoPlaybackBlog /></BasicLayout>} />

      {/* Burn Caption */}
      <Route path="tools/video/burn-caption" element={<BasicLayout><BurnCaption /></BasicLayout>} />
      <Route path="tools/video/burn-captions-into-video-online" element={<BasicLayout><BurnCaptionLanding /></BasicLayout>} />
      <Route path="tools/video/how-to-burn-captions-into-video-online" element={<BasicLayout><BurnCaptionsBlog /></BasicLayout>} />

      {/* Audio Tools */}
      {/* Convert */}
      <Route path="tools/audio/convert" element={<BasicLayout><AudioConvert /></BasicLayout>} />
      <Route path="tools/audio/convert-audio-online" element={<BasicLayout><AudioConvertLanding /></BasicLayout>} />
      <Route path="tools/audio/how-to-convert-audio-online" element={<BasicLayout><AudioConvertBlog /></BasicLayout>} />

      {/* Trim */}
      <Route path="tools/audio/trim" element={<BasicLayout><AudioTrim /></BasicLayout>} />
      <Route path="tools/audio/trim-audio-online" element={<BasicLayout><AudioTrimLanding /></BasicLayout>} />
      <Route path="tools/audio/how-to-trim-audio-online" element={<BasicLayout><AudioTrimBlog /></BasicLayout>} />

      {/* Merge */}
      <Route path="tools/audio/merge" element={<BasicLayout><AudioMerge /></BasicLayout>} />
      <Route path="tools/audio/merge-audio-online" element={<BasicLayout><AudioMergerLanding /></BasicLayout>} />
      <Route path="tools/audio/how-to-merge-audio-online" element={<BasicLayout><AudioMergerBlog /></BasicLayout>} />

      {/* Effects */}
      <Route path="tools/audio/effects" element={<BasicLayout><AudioEffects /></BasicLayout>} />
      <Route path="tools/audio/audio-effects-online" element={<BasicLayout><AudioEffectsLanding /></BasicLayout>} />
      <Route path="tools/audio/how-to-audio-effects-online" element={<BasicLayout><AudioEffectsBlog /></BasicLayout>} />

      {/* Playback Speed */}
      <Route path="tools/audio/playback" element={<BasicLayout><AudioPlayback /></BasicLayout>} />
      <Route path="tools/audio/audio-playback-speed-editor" element={<BasicLayout><AudioPlaybackLanding /></BasicLayout>} />
      <Route path="tools/audio/how-to-audio-playback-speed-editor" element={<BasicLayout><AudioPlaybackBlog /></BasicLayout>} />

      {/* Image Tools */}
      {/* Converter */}
      <Route path="tools/image/convert" element={<BasicLayout><ImageEditor /></BasicLayout>} />
      <Route path="tools/image/convert-image-online" element={<BasicLayout><ImageConverterLanding /></BasicLayout>} />
      <Route path="tools/image/how-to-convert-image-online" element={<BasicLayout><ImageConverterBlog /></BasicLayout>} />

      {/* Thumbnail Generator */}
      <Route path="tools/image/thumbnail" element={<BasicLayout><ThumbnailGenerator /></BasicLayout>} />
      <Route path="tools/image/extract-thumbnail-from-video" element={<BasicLayout><ThumbnailGeneratorLanding /></BasicLayout>} />
      <Route path="tools/image/how-to-generate-thumbnail" element={<BasicLayout><ThumbnailGeneratorBlog /></BasicLayout>} />

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
