import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaRegHeart } from 'react-icons/fa';
import Header from './Header';

const MusicFromQuery = () => {
  const { playlist } = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useState(playlist || 'queer-afrobeat');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const carouselRef = useRef(null);

  const playlists = {
    'crossing-the-line': {
      title: "Crossing The Line",
      tracks: [
        {
            id: '1',
            title: "Wetin",
            artist: "Yarden",
            cover: "https://files.selar.co/product-images/2024/products/tracy-bernard1/crossing-the-line-an-inte-selar.co-6712fdbcc9183.jpeg",
            spotifyId: "3yu5otkADG1ldufrPxABoo"
          },
        {
          id: '2',
          title: "Me & U",
          artist: "Tems",
          cover: "https://files.selar.co/product-images/2024/products/tracy-bernard1/crossing-the-line-an-inte-selar.co-6712fdbcc9183.jpeg",
          spotifyId: "4nFrcGM7MY1mpoQCC7Kefj"
        },
        {
            id: '3',
            title: "Golden",
            artist: "Kohla",
            cover: "https://files.selar.co/product-images/2024/products/tracy-bernard1/crossing-the-line-an-inte-selar.co-6712fdbcc9183.jpeg",
            spotifyId: "3X1IWB966sRlGYDj23EYP8"
          }
      ]
    }
  };

  const scrollToTrack = (index) => {
    if (carouselRef.current) {
      const trackElement = carouselRef.current.children[index];
      trackElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const navigateTrack = (direction) => {
    const tracks = playlists[currentPlaylist]?.tracks || [];
    let newIndex = direction === 'next'
      ? (currentTrackIndex + 1) % tracks.length
      : (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(newIndex);
    scrollToTrack(newIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = (trackId) => {
    setFavorites(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') navigateTrack('next');
      if (e.key === 'ArrowLeft') navigateTrack('prev');
      if (e.key === ' ') togglePlayPause();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrackIndex, currentPlaylist]);

  const tracks = playlists[currentPlaylist]?.tracks || [];

  return (
    <div>
      <Header />
      <div className="music-app">
        <div className="playlist-selector">
          {Object.keys(playlists).map(key => (
            <button
              key={key}
              className={`playlist-tab ${currentPlaylist === key ? 'active' : ''}`}
              onClick={() => {
                setCurrentPlaylist(key);
                setCurrentTrackIndex(0);
                setIsPlaying(false);
              }}
            >
              {playlists[key].title}
            </button>
          ))}
        </div>

        <div className="carousel-container">
          <div className="track-carousel" ref={carouselRef}>
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`track-card ${index === currentTrackIndex ? 'active' : ''}`}
                style={{ backgroundImage: `url(${track.cover})` }}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  if (index !== currentTrackIndex) setIsPlaying(false);
                }}
              >
                <div className="track-overlay">
                  <div className="track-info">
                    <h3>{track.title}</h3>
                    <p style={{ backgroundColor: "white", width: "fit-content", padding: ".2rem" }}>
                      <strong>{track.artist}</strong>
                    </p>
                  </div>

                  {index === currentTrackIndex && (
                    <div className="track-controls">
                      <button className="control-btn prev" onClick={(e) => { e.stopPropagation(); navigateTrack('prev'); }}>
                        <FaStepBackward />
                      </button>
                      <button className="play-btn" onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      <button className="control-btn next" onClick={(e) => { e.stopPropagation(); navigateTrack('next'); }}>
                        <FaStepForward />
                      </button>
                    </div>
                  )}

                  <button
                    className={`favorite-btn ${favorites.includes(track.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(track.id);
                    }}
                  >
                    {favorites.includes(track.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="spotify-embed">
          <iframe
            title="Spotify Player"
            src={`https://open.spotify.com/embed/track/${tracks[currentTrackIndex]?.spotifyId}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MusicFromQuery;
