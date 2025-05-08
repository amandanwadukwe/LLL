import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';

const RelatedPostCard = ({ title, tags }) => (
  <Link to="#" className="related-card">
    <h4>{title}</h4>
    <div className="tags">
      {tags.map(tag => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  </Link>
);

const getTagColor = (tag) => {
  const colors = {
    'intersex': '#8A1E3F, #D1493F',
    'education': '#F4A300, #E5B75F',
    'lgbtq+': '#A0A96B, #3A8F8B',
    'history': '#4C3F91, #8A1E3F',
    'activism': '#D1493F, #F4A300',
    'gender': '#3A8F8B, #4C3F91',
    'default': '#8A1E3F, #D1493F'
  };
  return colors[tag.toLowerCase()] || colors.default;
};

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [seriesPosts, setSeriesPosts] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const mockPosts = [
        {
          id: 1,
          title: "What Does It Mean to Be Intersex?",
          content: "<div><p>It is customary practice to look at a newborn and, with all the confidence in the world, declare <strong>\"It's a boy!\"</strong> or <strong>\"It's a girl!\"</strong> No questions asked, no curiosity sparked. It's been this way for centuries. We've made it tradition to tell the difference between \"boy\" and \"girl\" using nothing more than a quick glance at genitals.</p><p><em>But what if I told you there's more?</em></p><p>The educated version of this answer would leave most people speechless — because it isn't just about what you see. It's about chromosomes, hormones, internal organs, brain structure and function... and still, even that doesn't capture the full story. There are things about our biology we haven't even discovered yet.</p><p><strong>Let me shine a little light.</strong></p><p>Just as we assign sex based on genitals, science also looks at chromosomes: <strong>XX</strong> typically signals a female, <strong>XY</strong> typically a male. To make a boy, you need an X from a female and a Y from a male. For a girl? An X from each. That's how it works — until it doesn't.</p><p>Because sometimes, a child with XX chromosomes is born with genitals that look male. Sometimes a child with XY chromosomes is born with a vagina. Sometimes hormone levels don't match physical features. And that's just the surface. There are people whose bodies, minds, and biology don't tick the boxes we've drawn up for \"male\" and \"female.\"</p><p><strong>Welcome to the world of Intersex.</strong></p><p>People born intersex exist in a space we've been taught not to see — and if we do see them, we label them \"mistakes\" or try to correct them. Intersex people were once called \"hermaphrodites\" — a term now considered outdated and offensive. But the deeper harm? The surgeries.</p><p>Doctors used to (and still do) perform non-consensual genital surgeries on babies and children to \"fix\" them — to make them more like a man or a woman, because society couldn't handle anything in between. These weren't medical emergencies. They were social norms influencing medical decisions.</p><p><strong>Why?</strong> Because back then — and honestly, still now — men and women had different rights, and governments needed everyone to \"fit\" somewhere legal. There was no box for \"intersex.\" So they tried to erase them.</p><p>But intersex people are real. Alive. Whole. And often thriving — if given the chance.</p><p>They are part of our LGBTQIA+ community, and they deserve recognition without being asked to prove anything. They don't owe you trauma stories or surgery reports. If someone says <em>\"I don't feel like a boy or a girl,\"</em> believe them. You don't have to understand everything to offer respect.</p><p>This is why we ask you to learn about pronouns, to offer your \"they/them\" like an act of kindness — because it is. It's not about being trendy. It's about giving someone space to breathe.</p><p>You might not be intersex. You might never meet someone who tells you they are. But trust me, they've always been here — you just didn't know what to call them. Now you do.</p><p><strong>Welcome to the Alphabet Gang.</strong> The \"I\" stands for Intersex — and their existence is beautiful.</p></div>",
          tags: ["intersex", "education", "lgbtq+"],
          date: "2025-05-01",
          author: "LAJU",
          series: "Understanding the Alphabet Gang",
          seriesOrder: 1
        },
        {
          id: 2,
          title: "Why Pronouns Are Powerful: The Everyday Impact of \"They/Them\"",
          date: "2025-05-01",
          content: "<div><p>Coming Soon</p></div>",
          series: "Understanding the Alphabet Gang",
          seriesOrder: 2
        },
        {
          id: 3,
          title: "What It Means to Be Trans: Looking Like How You Feel",
          content: "<div><p>Coming Soon</p></div>",
          series: "Understanding the Alphabet Gang",
          seriesOrder: 3
        },
        {
          id: 4,
          title: "Crossing The Line by Tracy Cress",
          content: "<div style='max-width: 700px; margin: auto; font-family: sans-serif; padding: 20px; line-height: 1.6;'><img src='https://files.selar.co/product-images/2024/products/tracy-bernard1/crossing-the-line-an-inte-selar.co-6712fdbcc9183.jpeg' alt='Crossing the Line book cover' style='width: 100%; height: auto; border-radius: 12px; margin-bottom: 20px;'><h2 style='margin-bottom: 10px;'>Crossing the Line is the black queer love story that took me back to Nigeria and wrecked me in the best way</h2><p>I grew up in Nigeria. And queerness there? It's rarely soft. It's rarely safe.</p><p>But <em>Crossing the Line</em> by Tracy Cress gave me something different—a story where two Black women fall for each other quietly, tenderly, with love that's a little secret but surprisingly supported.</p><p>It felt like a dream of home I wish I'd known. One that smells like fried plantain and first love. A Nigeria that held space for softness, for joy, for people like me.</p><p>And then—the playlist. Afrobeats that wrap you up and don't let go. I pulled out the most romantic ones for you.</p><p><a href='https://your-playlist-link.com' target='_blank' style='color: #e91e63; text-decoration: none;'>➤ Listen to the curated playlist</a></p><p>Read it. Play it. And let it remind you that our stories deserve to be this soft.</p></div>",
        }
      ];

      const currentPost = mockPosts.find(p => p.id === Number(id));
      setPost(currentPost);

      if (currentPost?.series) {
        const seriesRelated = mockPosts.filter(p => p.series === currentPost.series);
        setSeriesPosts(seriesRelated);
      }

      // Check if post date is within a week from today
      if (currentPost?.date) {
        const today = new Date();
        const postDate = new Date(currentPost.date);
        const oneWeekFromNow = new Date(today);
        oneWeekFromNow.setDate(today.getDate() + 7);
        
        setShowComingSoon(postDate > today && postDate <= oneWeekFromNow);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-post-container">
      <Header />
      <nav style={{padding:"0 3rem"}} className="breadcrumbs">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/">Blog</Link>
        <span> / </span>
        <span>{post.title}</span>
      </nav>

      <article className="blog-post">
        <header>
          {post.series && (
            <div className="series-header" style={{ 
              background: 'linear-gradient(90deg, #8A1E3F, #D1493F, #F4A300, #E5B75F, #A0A96B, #3A8F8B, #4C3F91)',
              color: 'white',
              padding: '1rem',
              marginBottom: '2rem'
            }}>
              <h3>{post.series} - Part {post.seriesOrder}</h3>
              <div className="series-navigation">
                {post.seriesOrder > 1 && (
                  <Link to={`/blog/${Number(id) - 1}`}>← Previous</Link>
                )}
                {post.seriesOrder < seriesPosts.length && (
                  <Link to={`/blog/${Number(id) + 1}`}>Next →</Link>
                )}
              </div>
            </div>
          )}

          <h1 style={{ 
            background: 'linear-gradient(90deg, #8A1E3F, #D1493F, #F4A300, #E5B75F, #A0A96B, #3A8F8B, #4C3F91)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            {post.title}
          </h1>
          
          <div className="post-meta">
            <span>By {post.author}</span>
            <span>{post.date && new Date(post.date).toLocaleDateString()}</span>
          </div>
        </header>

        {showComingSoon ? (
          <div className="coming-soon-message" style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            margin: '2rem 0',
            border: '1px solid #e9ecef'
          }}>
            <h3>Coming Soon!</h3>
            <p>This post will be available on {post.date && new Date(post.date).toLocaleDateString()}</p>
          </div>
        ) : (
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {post.tags?.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <Link 
                key={tag} 
                to={`/tag/${tag}`}
                className="tag"
                style={{
                  background: `linear-gradient(90deg, ${getTagColor(tag)})`,
                  color: 'white'
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </article>

      {seriesPosts.length > 1 && (
        <div className="series-list">
          <h3>More in this series:</h3>
          <ul>
            {seriesPosts.map(seriesPost => (
              <li key={seriesPost.id} className={seriesPost.id === post.id ? 'active' : ''}>
                <Link to={`/blog/${seriesPost.id}`}>
                  {seriesPost.seriesOrder}. {seriesPost.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogPost;