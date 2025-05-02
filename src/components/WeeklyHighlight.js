import { useRef, useEffect } from 'react';

const WeeklyHighlight = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="highlights" className="weekly section-animate" ref={sectionRef}>
      <div className="container">
        <h2 style={{ marginBottom: '30px' }}>Weekly Highlight</h2>
        <div className="highlight-card">
          <span className="highlight-tag">Artist Spotlight</span>
          <h3 style={{ fontSize: '2em', margin: '10px 0' }}>Femi Rebel: Breaking Gender Norms in Afrobeat</h3>
          <p style={{ fontSize: '1.1em' }}>
            How this non-binary artist is redefining the genre with their debut album "No Borders".
          </p>
          <a href="#" style={{ display: 'inline-block', marginTop: '20px', fontWeight: 'bold', color: 'var(--accent)' }}>
            Read more →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeeklyHighlight;