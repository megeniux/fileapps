import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import VideoCompression from '../pages/tools/VideoCompression'
import VideoConvert from '../pages/tools/VideoConvert'
import VideoTrim from '../pages/tools/VideoTrim'    
import VideoResize from '../pages/tools/VideoResize'
import Contact from '../pages/Contact'
import AboutUs from '../pages/AboutUs'
import TOS from '../pages/TOS'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import BasicLayout from '../components/BasicLayout'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />
      <Route path="/compress" element={<BasicLayout><VideoCompression /></BasicLayout>} />
      <Route path="/convert" element={<BasicLayout><VideoConvert /></BasicLayout>} />
      <Route path="/trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />
      <Route path="/resize" element={<BasicLayout><VideoResize /></BasicLayout>} />
      <Route path="/contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="/about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="/tos" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="/privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
    </Routes>
  )
}

export default AppRoutes