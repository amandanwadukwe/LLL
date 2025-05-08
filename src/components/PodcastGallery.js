import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

// Component for each episode card
const PodcastCard = ({ episode }) => {
  const getPlatformIcon = () => {
    switch (episode.platform) {
      case 'spotify':
        return (
          <svg viewBox="0 0 24 24" className="platform-icon">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg viewBox="0 0 24 24" className="platform-icon">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
          </svg>
        );
      case 'soundcloud':
        return (
          <svg viewBox="0 0 24 24" className="platform-icon">
            <path d="M11.56 8.87V17h8.76c1.1 0 1.98-.9 1.98-2s-.88-2-1.98-2c-.31 0-.6.07-.89.18-.24-2.34-2.24-4.18-4.66-4.18-1.52 0-2.86.81-3.62 2.04M3.22 11.5v3.55l1.52-.01v-3.54m-2.2 1.51v.5h1.52v-.5m3.05-1.51v3.55l1.52-.01v-3.54m-1.52 1.51v.5h1.52v-.5m3.05-1.51v3.55l1.52-.01v-3.54m-1.52 1.51v.5h1.52v-.5m-3.05-1.51v3.55l1.52-.01v-3.54m-1.52 1.51v.5h1.52v-.5M7.8 8.36v3.55l1.52-.01V8.35m-1.52 1.51v.5h1.52v-.5z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="platform-icon">
            <path d="M12 2v20a10 10 0 0 1 0-20zm0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
          </svg>
        );
    }
  };

  return (
    <div className="podcast-card">
      <div className="podcast-thumbnail">
        <img src={episode.thumbnail} alt={episode.title} />
        <div className="podcast-platform">
          {getPlatformIcon()}
          <span>{episode.platform}</span>
        </div>
      </div>

      <div className="podcast-info">
        <h3>{episode.title}</h3>
        <p className="podcast-description">{episode.description}</p>
        <div className="podcast-meta">
          <span className="duration">{episode.duration}</span>
          <div className="podcast-tags">
            {episode.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="podcast-embed">
        {episode.platform === 'spotify' && (
          <iframe
            src={`https://open.spotify.com/embed/episode/${episode.embedId}`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="encrypted-media"
            title={episode.title}
          ></iframe>
        )}
        {episode.platform === 'youtube' && (
          <iframe
            src={`https://www.youtube.com/embed/${episode.embedId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={episode.title}
          ></iframe>
        )}
        {episode.platform === 'soundcloud' && (
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${episode.embedId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
            title={episode.title}
          ></iframe>
        )}
      </div>
    </div>
  );
};

const PodcastGallery = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [activePlatform, setActivePlatform] = useState('all');

  useEffect(() => {
    const sampleEpisodes = [
        {
          id: 1,
          title: "U-HAUL LESBIANS WITH KANDI REIGN & AITRA",
          description: "THE NO HOMO SHOW EPISODE #39",
          tags: ["Studs", "Uhaul"],
          date: "2025-05-11",
          platform: "spotify",
          embedId: "0pUIEKEeujR6Anr5e8UdRe", // Spotify episode ID
          duration: "53:56",
          thumbnail: "https://i.scdn.co/image/ab67656300005f1f27996b644e8aa69967b642bc",
          acknowledgements: "<p>Special thanks to our guests for sharing their stories.</p>"
        }
      ];
    setEpisodes(sampleEpisodes);
    setFilteredEpisodes(sampleEpisodes);
  }, []);

  useEffect(() => {
    let results = episodes;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    results = results.filter(episode => {
      if (!episode.date) return false;
      try {
        const episodeDate = new Date(episode.date);
        episodeDate.setHours(0, 0, 0, 0);
        return episodeDate <= today;
      } catch {
        return false;
      }
    });

    if (searchTerm) {
      results = results.filter(episode =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeTag !== 'all') {
      results = results.filter(episode =>
        episode.tags.includes(activeTag)
      );
    }

    if (activePlatform !== 'all') {
      results = results.filter(episode =>
        episode.platform === activePlatform
      );
    }

    setFilteredEpisodes(results);
  }, [searchTerm, activeTag, activePlatform, episodes]);

  const allTags = ['all', ...new Set(episodes.flatMap(episode => episode.tags))];
  const allPlatforms = ['all', ...new Set(episodes.map(episode => episode.platform))];

  return (
    <div>
      <Header />
      <div className="podcast-gallery">
        <div className="podcast-controls">
          <input
            type="text"
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="podcast-search"
          />
          <div className="filter-options">
            <div className="platform-filters">
              <label>Platform:</label>
              <select
                value={activePlatform}
                onChange={(e) => setActivePlatform(e.target.value)}
              >
                {allPlatforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="tag-filters">
              <label>Tags:</label>
              <select
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? 'All Tags' : tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="episodes-grid">
          {filteredEpisodes.map(episode => (
            <PodcastCard key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastGallery;
