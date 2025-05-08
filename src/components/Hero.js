import { useEffect, useRef } from 'react';
import HeroImg from "../resources/hero.jpg";

const Hero = () => {
  const heroTitleRef = useRef();
  const heroRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      heroTitleRef.current.style.backgroundPosition =
        heroTitleRef.current.style.backgroundPosition === 'left' ? 'right' : 'left';
    }, 3000);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(heroRef.current);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const featuredTrack = {
    title: "Fucking the Devil",
    artist: "Temmie Ovwasa",
    spotifyId: "6PTaOP9YopTlQ3ERrP0h59",
    cover: HeroImg//"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXtPiRGJSIotRvnWWzUFqTxZE4WzFDMFMSA&s"
  };

  return (
    <section className="hero section-animate" ref={heroRef}>
      <div className="container">
        <div className="grid-2">
          {/* Left side: Text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              className="hero-image" 
              style={{ 
                width: '100%', 
                height: '700px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '12px',
                marginBottom: '1rem',
                backgroundImage: `url(${featuredTrack.cover})`
              }}
            />
            <h3 style={{ marginBottom: '0.5rem' }}>
              🎧 <strong>{featuredTrack.title}</strong> by {featuredTrack.artist}
            </h3>
            <iframe
              title="Spotify Player"
              src={`https://open.spotify.com/embed/track/${featuredTrack.spotifyId}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '8px', maxWidth: '400px' }}
            ></iframe>
          </div>
          {/* Right side: Image + Track */}
          <div>
            <h1 className="hero-title" ref={heroTitleRef}>
              LUSH & LOUD by <span>LAJU</span>
            </h1>
            <p style={{ fontSize: '1.2em', marginTop: '20px' }}>
              Welcome to <strong>Lush & Loud by LAJU</strong>
              <br /><br />
              This is a home for Black queer women who believe in love, the kind that heals, the kind that fights, the kind that feels like freedom.
              <br /><br />
              I’m Laju, a Nigerian lesbian building a future I couldn’t have back home. This space is my love letter to us: to the women who’ve had to leave, the women who stay and resist, and the ones still finding their way.
              <br /><br />
              Whether you’re here to dance, to heal, or just to breathe easy for a while, you’re welcome.
              <br /><br />
              💋 Laju
            </p>
          </div>

          
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
