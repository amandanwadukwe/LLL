// VideoRouter.js
import { Routes, Route } from 'react-router-dom';
import VideoGallery from './VideoGallery';
import VideoPlayer from './VideoPlayer';

const VideoRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<VideoGallery />} />
      <Route path="/:id" element={<VideoPlayer />} /> {/* This will match links like /videos/1 */}
    </Routes>
  );
};

export default VideoRouter;