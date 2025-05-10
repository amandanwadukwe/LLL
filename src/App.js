import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HighlightsPage from './pages/HighlightsPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import MusicPage from './pages/MusicPage';
import BlogRouter from './components/BlogRouter'; // Your nested router
import Music from './components/Music';
import VideoRouter from './components/VideoRouter ';
import PodcastGallery from './components/PodcastGallery';
import MusicFromQuery from './components/MusicFromQuery';
import Events from './components/Events';
import PodcastRouter from './components/PodcastRouter';
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/highlights" element={<HighlightsPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/music" element={<Music />} />
        <Route path="/blog/*" element={<BlogRouter />} />
        <Route path="/videos/*" element={<VideoRouter />} />
        <Route path="/podcasts/*" element={<PodcastGallery />} />
        <Route path="/playlists/:playlist" element={<MusicFromQuery />} />
      </Routes>
    </Router>
  );
}

export default App;
