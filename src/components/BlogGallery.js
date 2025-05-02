import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const BlogGallery = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        title: "What Does It Mean to Be Intersex?",
        excerpt: "Exploring the realities of intersex identity in our society...",
        tags: ["intersex", "education", "identity+"],
        date: "2025-05-01",
        series: "Understanding the Alphabet Gang",
        seriesOrder: 1,
        image: "https://images.unsplash.com/photo-1664203944383-f0b8aeae69e2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxibGFjayUyMGludGVyc2V4fGVufDB8fDB8fHww"
      },
      {
        id: 2,
        title: "Why Pronouns Are Powerful: The Everyday Impact of “They/Them”",
        excerpt: "",
        tags: ["education", "language", "they/them"],
        date: "",
        series: "Understanding the Alphabet Gang", 
        seriesOrder: 2,
        image: "https://media.istockphoto.com/id/1245924693/vector/coming-soon.webp?a=1&b=1&s=612x612&w=0&k=20&c=8HbAe82ef34coQAQIPkW__9ADvHKZ8vUaLUhhN99dUI="
      },
      {
        id: 3,
        title: "What It Means to Be Trans: Looking Like How You Feel",
        excerpt: "",
        tags: ["identity", "education", "transgender", "healing"],
        date: "",
        image: "https://media.istockphoto.com/id/1245924693/vector/coming-soon.webp?a=1&b=1&s=612x612&w=0&k=20&c=8HbAe82ef34coQAQIPkW__9ADvHKZ8vUaLUhhN99dUI="
      }
    ];
    
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
  }, []);

  useEffect(() => {
    let results = posts;

    if (searchTerm) {
      results = results.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeTag !== 'all') {
      results = results.filter(post =>
        post.tags.includes(activeTag)
      );
    }

    setFilteredPosts(results);
  }, [searchTerm, activeTag, posts]);

  const allTags = ['all', ...new Set(posts.flatMap(post => post.tags))];

  return (
    <div>
      <Header />
      <div className="blog-gallery">
        <div className="blog-controls">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        <div className="posts-grid">
          {filteredPosts.map(post => (
            <BlogPostCard
              key={post.id}
              post={post}
              rainbowGradient="linear-gradient(90deg, #8A1E3F, #D1493F, #F4A300, #E5B75F, #A0A96B, #3A8F8B, #4C3F91)"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostCard = ({ post, rainbowGradient }) => {
  return (
    <Link to={`/blog/${post.id}`} className="post-card">
      <div className="post-image" style={{ backgroundImage: `url(${post.image})` }} />
      <div className="post-content">
        {post.series && (
          <span className="series-badge" style={{ background: rainbowGradient }}>
            {post.series} #{post.seriesOrder}
          </span>
        )}

        <h3 style={{ background: rainbowGradient, WebkitBackgroundClip: 'text', color: 'transparent' }}>
          {post.title}
        </h3>

        <p className="excerpt">{post.excerpt}</p>

        <div className="post-meta">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <div className="tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogGallery;