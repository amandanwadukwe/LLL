import { useState, useRef, useEffect } from 'react';

const Gallery = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef();

  // Instagram embed data
  const instagramPosts = [
    {
      id: 'C1xJ9KXJQ7E',
      url: 'https://www.instagram.com/p/C9-M2XHosgh/?img_index=1',
      caption: 'London’s first Queer Afrobeats night! We are a movement, a safe space and most importantly, a place to shake yansh and dance',
      tags: ['Afrobeats'],
      type: 'image'
    },
    {
      id: 'C2yK8LYKR9F',
      url: 'https://www.instagram.com/p/C8zfmljRJZm/?img_index=1',
      caption: 'Couple! 😍 #LoveIsLove #MrsAndMrs #PrideMonth #BlackLesbians',
      tags: ['Couple'],
      type: 'image'
    },
    {
      id: 'DGUq7vGMbfz',
      url: 'https://www.instagram.com/p/DGUq7vGMbfz/',
      caption: 'Love being in community with ya’ll. 🫶🏾',
      tags: [],
      type: 'image'
    },
    {
      id: 'C4wN6NYMT9H',
      url: 'https://www.instagram.com/p/DE_YhG0tfxK/',
      caption: 'Black women who love women! 🔥🔥🔥🔥',
      tags: ['Erotic'],
      type: 'image'
    },
    {
      id: 'DHv7LU0RruA',
      url: 'https://www.instagram.com/p/DHv7LU0RruA/',
      caption: 'Black women who love women! 🔥🔥🔥🔥',
      tags: ['Erotic'],
      type: 'image'
    },
    {
      id: 'Ceh2N1eF6mR',
      url: 'https://www.instagram.com/p/Ceh2N1eF6mR/',
      caption: 'Our community healing circle #Activism #Love',
      tags: ['Erotic'],
      type: 'image'
    }
  ];

  // Available tags from all posts
  const allTags = ['All', ...new Set(instagramPosts.flatMap(post => post.tags))];

  // Filter posts based on active tag and search query
  const filteredPosts = instagramPosts.filter(post => {
    const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);
    const matchesSearch = post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  useEffect(() => {
    // Load Instagram embed script if not already present
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Reprocess Instagram embeds
    if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
      window.instgrm.Embeds.process();
    }
  }, [filteredPosts]);

  // Rainbow gradient style
  const rainbowGradient = {
    background: 'linear-gradient(90deg, #8A1E3F, #D1493F, #F4A300, #E5B75F, #A0A96B, #3A8F8B, #4C3F91)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <section id="gallery" className="section-animate" ref={sectionRef}>
      <div className="container">
        <h2 style={{ ...rainbowGradient, marginBottom: '30px' }}>Gallery</h2>
        
        {/* Gallery Controls */}
        <div className="gallery-controls">
          <div className="gallery-tags">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
                style={{
                  background: activeTag === tag ? 
                    'linear-gradient(90deg, #8A1E3F, #D1493F)' : 
                    'var(--gray)',
                  color: activeTag === tag ? 'white' : 'var(--black)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: '10px 15px', 
              border: '2px solid var(--black)',
              borderRadius: '4px',
              fontFamily: 'inherit'
            }} 
          />
        </div>

        {/* Instagram Posts Grid */}
        <div className="instagram-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="instagram-embed-container">
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF', 
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    margin: '0 auto',
                    maxWidth: '100%',
                    width: '100%'
                  }}
                >
                  <div style={{ padding: '16px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(90deg, #8A1E3F, #D1493F)',
                        borderRadius: '50%',
                        marginRight: '10px'
                      }}></div>
                      <strong style={{ 
                        ...rainbowGradient,
                        fontSize: '14px'
                      }}>
                        LUSH & lOUD BY LAJU
                      </strong>
                    </div>
                    <p style={{ 
                      margin: '10px 0',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      {post.caption}
                    </p>
                    <div style={{
                      height: post.type === 'video' ? '400px' : '500px',
                      background: 'rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999'
                    }}>
                      {post.type === 'video' ? '🎥 Video Content' : '📷 Image Content'}
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '10px',
                      color: '#999',
                      fontSize: '12px'
                    }}>
                      <span>❤️ 1,234 likes</span>
                      <span>View on Instagram</span>
                    </div>
                  </div>
                </blockquote>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="tag"
                      style={{
                        background: `linear-gradient(90deg, ${getTagColor(tag)})`,
                        color: 'white'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results" style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontSize: '1.2rem' }}>No posts found matching your criteria</p>
              <button 
                onClick={() => {
                  setActiveTag('All');
                  setSearchQuery('');
                }}
                style={{
                  background: 'linear-gradient(90deg, #8A1E3F, #D1493F)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  marginTop: '20px',
                  cursor: 'pointer'
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper function for tag colors
const getTagColor = (tag) => {
  const colors = {
    'Performances': '#8A1E3F, #D1493F',
    'Behind the Scenes': '#F4A300, #E5B75F',
    'Activism': '#A0A96B, #3A8F8B',
    'Erotic': '#4C3F91, #8A1E3F',
    'Art': '#3A8F8B, #4C3F91',
    'default': '#D1493F, #F4A300'
  };
  return colors[tag] || colors.default;
};

export default Gallery;
