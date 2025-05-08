import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      const mockVideos = [
        {
          id: 1,
          title: "MARRIED A MAN, NOW I'M A LESBIAN WITH BIG MADDIE MAD",
          description: "THE NO HOMO SHOW EPISODE #45",
          tags: ["relationships"],
          date: "2025-05-11",
          type: "youtube",
          videoId: "vG-CHlSqJ6M",
          duration: "53:11",
          acknowledgements: "<p>The <strong>No Homo Show</strong> is straight vibes. It’s all gay, all day. Black, lesbian, loud, and real as hell. It's where the culture kicks back, speaks truth, and stays unapologetic.</p>",
          transcript: "<p>This feature is coming soon</p>"
        },
        
      ];

      const currentVideo = mockVideos.find(v => v.id === Number(id));
      setVideo(currentVideo);

      // Check if video date is in the future
      if (currentVideo?.date) {
        const today = new Date();
        const videoDate = new Date(currentVideo.date);
        setShowComingSoon(videoDate > today);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div className="video-player-container">
      <Header />
      
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/videos">Video Gallery</Link>
        <span> / </span>
        <span>{video.title}</span>
      </nav>

      <article className="video-player">
        <header>
          <h1>{video.title}</h1>
          <p className="video-description">{video.description}</p>
        </header>

        {showComingSoon ? (
          <div className="coming-soon-message">
            <h3>Coming Soon!</h3>
            <p>This video will be available on {new Date(video.date).toLocaleDateString()}</p>
          </div>
        ) : (
          <>
            <div className="video-embed">
              {video.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                ></iframe>
              ) : (
                <video controls autoPlay>
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="video-meta">
              <div className="video-tags">
                {video.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="video-duration">{video.duration}</div>
            </div>

            {video.acknowledgements && (
              <div className="video-acknowledgements">
                <h3>About</h3>
                <div 
                  className="acknowledgements-content"
                  dangerouslySetInnerHTML={{ __html: video.acknowledgements }}
                />
              </div>
            )}

            {video.transcript && (
              <div className="video-transcript">
                <h3>Transcript</h3>
                <div 
                  className="transcript-content"
                  dangerouslySetInnerHTML={{ __html: video.transcript }}
                />
              </div>
            )}
          </>
        )}
      </article>
    </div>
  );
};

export default VideoPlayer;