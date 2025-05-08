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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXPirW6vubLWDhp4sFSOP3kIj8q5wSXb1MA&s" alt=""/>
            <h3>UK Black Pride 2025</h3>
            <p>Marking its 20th anniversary, UK Black Pride is the world's largest celebration of LGBTQIA+ Black and POC communities. Expect performances, community stalls, and a powerful atmosphere of joy and protest. </p>
            <div className="event-location">Newham, London</div>
          </div>
          <div className="event-card" onClick={()=>handleClick("https://www.ukblackpride.org.uk/uk-black-pride-2025?utm_source=chatgpt.com")} >
            <div className="event-date">10 August 2025</div>
            <img src="https://scontent.flhr14-1.fna.fbcdn.net/v/t39.30808-6/485809784_1064889848991893_8322108407071476034_n.jpg?stp=c0.225.1366.1366a_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=92e838&_nc_ohc=6UqlsxWwRiwQ7kNvwFqDdj2&_nc_oc=AdnTuPjtQvL2zPkXSGRx154-dQXdKhHKTxo-hs9hKKLYonMNDJfA_29y1qqAxFRuM3E&_nc_zt=23&_nc_ht=scontent.flhr14-1.fna&_nc_gid=yjI_mUCN99KUoM1QpuoJFA&oh=00_AfLAkRIPR1r-aGVA-4sDgTPwAUjk7rR29TO1CWTFbqopXw&oe=68227F9E" alt=""/>
            <h3>Lick Weekender</h3>
            <p>Lick Weekender in Crete is the ultimate sun-drenched escape where Black and brown queer women take over paradise with unmatched vibes, poolside parties, and affirming energy. Imagine late-night dancing, seaside kisses, and waking up to joy that feels like it's just for you.</p>
            <div className="event-location">Crete, Greece</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;