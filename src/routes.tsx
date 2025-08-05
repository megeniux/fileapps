import { Routes, Route } from 'react-router-dom';
import BasicLayout from './components/BasicLayout';
import Home from './pages/Home';
import VideoCompression from './pages/VideoCompression/VideoCompression';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import TOS from './pages/TOS';
import PrivacyPolicy from './pages/PrivacyPolicy';
import VideoConvert from './pages/VideoConvert';
import VideoTrim from './pages/VideoTrim';
import VideoMerge from './pages/VideoMerge';
import ExtractAudio from './pages/ExtractAudio';
import ThumbnailGenerator from './pages/ThumbnailGenerator';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />
      <Route path="/compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
      <Route path="/convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
      <Route path="/trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
      <Route path="/merge" element={<BasicLayout><VideoMerge /></BasicLayout>} />
      <Route path="/extract-audio" element={<BasicLayout><ExtractAudio /></BasicLayout>} />
      <Route path="/thumbnail" element={<BasicLayout><ThumbnailGenerator /></BasicLayout>} />
      <Route path="/contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="/about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="/tos" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="/privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
    </Routes>
  );
}

export default AppRoutes;
