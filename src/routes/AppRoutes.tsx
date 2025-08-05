import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import VideoCompression from '../pages/VideoCompression/VideoCompression'
import VideoConvert from '../pages/VideoConvert' // Import new page
import VideoTrim from '../pages/VideoTrim'       // Import new page
import VideoResize from '../pages/VideoResize'   // Import new page
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
      <Route path="/convert" element={<BasicLayout><VideoConvert /></BasicLayout>} /> {/* Add new route */}
      <Route path="/trim" element={<BasicLayout><VideoTrim /></BasicLayout>} />       {/* Add new route */}
      <Route path="/resize" element={<BasicLayout><VideoResize /></BasicLayout>} />   {/* Add new route */}
      <Route path="/contact" element={<BasicLayout><Contact /></BasicLayout>} />
      <Route path="/about" element={<BasicLayout><AboutUs /></BasicLayout>} />
      <Route path="/tos" element={<BasicLayout><TOS /></BasicLayout>} />
      <Route path="/privacy" element={<BasicLayout><PrivacyPolicy /></BasicLayout>} />
    </Routes>
  )
}

export default AppRoutes