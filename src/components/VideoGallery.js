import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  useEffect(() => {
    const sampleVideos = [
      {
        id: 1,
        title: "MARRIED A MAN, NOW I'M A LESBIAN WITH BIG MADDIE MAD",
        description: "THE NO HOMO SHOW EPISODE #45",
        tags: ["relationships"],
        date: "2025-05-11",
        type: "youtube",
        videoId: "vG-CHlSqJ6M", // Example YouTube ID
        duration: "1:20:11",
        acknowledgements: "<p></p>"
      }
    ];
    
    setVideos(sampleVideos);
    setFilteredVideos(sampleVideos);
  }, []);

  useEffect(() => {
    let results = videos;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First filter by date (only show videos with date before or equal to today)
    results = results.filter(video => {
      if (!video.date) return false;
      try {
        const videoDate = new Date(video.date);
        videoDate.setHours(0, 0, 0, 0);
        return videoDate <= today;
      } catch {
        return false;
      }
    });

    // Then apply search and tag filters
    if (searchTerm) {
      results = results.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeTag !== 'all') {
      results = results.filter(video =>
        video.tags.includes(activeTag)
      );
    }

    setFilteredVideos(results);
  }, [searchTerm, activeTag, videos]);

  const allTags = ['all', ...new Set(videos.flatMap(video => video.tags))];

  return (
    <div>
      <Header />
      <div className="video-gallery">
        <div className="video-controls">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="video-search"
          />

          <div className="tag-filters">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="videos-grid">
          {filteredVideos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ video }) => {
  const youtubeThumbnail = video.type === 'youtube' 
    ? `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
    : null;

  return (
    <Link to={`/videos/${video.id}`} className="video-card">
      <div className="video-thumbnail">
        {youtubeThumbnail ? (
          <img 
            src={youtubeThumbnail} 
            alt={video.title}
            onError={(e) => {
              e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
            }}
          />
        ) : (
          <img src={video.thumbnail} alt={video.title} />
        )}
        <div className="video-duration">{video.duration}</div>
        <div className="video-play-icon">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="video-info">
        <h3>{video.title}</h3>
        <p className="video-description">{video.description}</p>
        <div className="video-tags">
          {video.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default VideoGallery;

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/L7AdXQx2tcU?si=xFwHovmLHB-VsXtr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}