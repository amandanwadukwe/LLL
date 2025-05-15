import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';


const Header = () => {
  const headerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        headerRef.current.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
        headerRef.current.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="container" ref={headerRef}>
      <div className="grid-2">
        <Link to="/" className="logo">BLACK. QUEER. WOMAN.</Link>
        <nav>
          <ul>
            {/* <li><Link to="/highlights">Highlights</Link></li> */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/podcasts">Podcasts</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;