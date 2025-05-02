import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaRegHeart } from 'react-icons/fa';
import Header from './Header';

const Music = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState('queer-afrobeat');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const carouselRef = useRef(null);

  // Playlist data
  const playlists = {
    'queer-afrobeat': {
      title: "Queer Afrobeat",
      tracks: [
        {
          id: '1',
          title: "Sweeeet",
          artist: "Amaarae",
          cover: "https://thenativemag.com/wp-content/uploads/2023/03/IMG_0768.png",
          spotifyId: "5j34I5WUnKZVHP14J0Mlcb"
        }
      ]
    },
    'coming': {
      title: "Coming Out",
      tracks: [
        {
          id: '4',
          title: "YBGFA",
          artist: "Teni",
          cover: "data:image/jpeg;base64,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",
          spotifyId: "5MUAhZVNZU4UF8FmhUBQYs"
        }
      ]
    },
    'trauma-vibes': {
      title: "More",
      tracks: [
        {
          id: '5',
          title: "Rainbow Sheep",
          artist: "Temmie Ovwasa",
          cover: "data:image/jpeg;base64,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",
          spotifyId: "4zPADY9caqjavzqZsUxOLV"
        }
      ]
    }
  };

  // Handle carousel scroll
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

  // Play next/previous track
  const navigateTrack = (direction) => {
    const tracks = playlists[currentPlaylist].tracks;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentTrackIndex + 1) % tracks.length;
    } else {
      newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    }
    
    setCurrentTrackIndex(newIndex);
    scrollToTrack(newIndex);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle favorite
  const toggleFavorite = (trackId) => {
    setFavorites(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId) 
        : [...prev, trackId]
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') navigateTrack('next');
      if (e.key === 'ArrowLeft') navigateTrack('prev');
      if (e.key === ' ') togglePlayPause();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrackIndex, currentPlaylist]);

  return (
     <div>
        <Header />
     
    <div className="music-app">
      {/* Playlist Selector */}
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

      {/* Main Carousel */}
      <div className="carousel-container">
        <div 
          className="track-carousel"
          ref={carouselRef}
        >
          {playlists[currentPlaylist].tracks.map((track, index) => (
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
                  <p style={{backgroundColor:"white", width:"fit-content", padding:".2rem"}}><strong>{track.artist}</strong></p>
                </div>
                
                {index === currentTrackIndex && (
                  <div className="track-controls">
                    <button 
                      className="control-btn prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTrack('prev');
                      }}
                    >
                      <FaStepBackward />
                    </button>
                    
                    <button 
                      className="play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    
                    <button 
                      className="control-btn next"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTrack('next');
                      }}
                    >
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
                  {/* {favorites.includes(track.id) ? <FaHeart /> : <FaRegHeart />} */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotify Embed */}
      <div className="spotify-embed">
        <iframe
          title="Spotify Player"
          src={`https://open.spotify.com/embed/track/${playlists[currentPlaylist].tracks[currentTrackIndex].spotifyId}`}
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

export default Music;