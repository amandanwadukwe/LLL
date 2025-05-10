import { useRef, useEffect } from 'react';
import Header from './Header';

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

    <><Header />
    <section id="events" className="events section-animate" ref={sectionRef}>
      
      <div className="container">
        <h2 style={{ marginBottom: '40px' }}>Upcoming Events</h2>
        <div className="grid-3">
          <div className="event-card" onClick={()=>handleClick("https://www.ukblackpride.org.uk/uk-black-pride-2025?utm_source=chatgpt.com")} >
            <div className="event-date">10 August 2025</div><br></br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXPirW6vubLWDhp4sFSOP3kIj8q5wSXb1MA&s" alt=""/>
            <h3>UK Black Pride 2025</h3>
            <p>Marking its 20th anniversary, UK Black Pride is the world's largest celebration of LGBTQIA+ Black and POC communities. Expect performances, community stalls, and a powerful atmosphere of joy and protest. </p>
            <div className="event-location">Newham, London</div>
          </div>
          <div className="event-card" onClick={()=>handleClick("https://www.instagram.com/lickevents/?hl=en")} >
            <div className="event-date">17-18 August 2025</div><br></br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2EzGNRdcdMzKVEJc4OndvcftQf_O96tyvpymTKXNybPUemNfJboywyVSOmP6hoC7-vVY&usqp=CAU" alt=""/>
            <h3>Lick Weekender</h3>
            <p>Lick Weekender in Crete is the ultimate sun-drenched escape where Black and brown queer women take over paradise with unmatched vibes, poolside parties, and affirming energy. Imagine late-night dancing, seaside kisses, and waking up to joy that feels like it's just for you.</p>
            <div className="event-location">Crete, Greece</div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Events;