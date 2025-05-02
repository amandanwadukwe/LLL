import { useRef, useEffect } from 'react';

const Events = () => {
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

  const handleClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };
  

  return (
    <section id="events" className="events section-animate" ref={sectionRef}>
      <div className="container">
        <h2 style={{ marginBottom: '40px' }}>Upcoming Events</h2>
        <div className="grid-3">
          <div className="event-card" onClick={()=>handleClick("https://www.ukblackpride.org.uk/uk-black-pride-2025?utm_source=chatgpt.com")} >
            <div className="event-date">10 August 2025</div>
            <h3>UK Black Pride 2025</h3>
            <p>Marking its 20th anniversary, UK Black Pride is the world's largest celebration of LGBTQIA+ Black and POC communities. Expect performances, community stalls, and a powerful atmosphere of joy and protest. </p>
            <div className="event-location">Newham, London</div>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Events;