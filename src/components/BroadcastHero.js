import React, { useEffect, useState } from 'react';
// import './BroadcastHero.css'; // Create a separate CSS file or use Tailwind if preferred

const images = [
  { src: 'https://images.unsplash.com/photo-1660963521159-f980cc30149d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY3fHxibGFjayUyMGxlc2JpYW4lMjBjb3VwbGV8ZW58MHx8MHx8fDA%3D', alt: 'Broadcast 1' },
  { src: 'https://images.unsplash.com/photo-1598423133394-d6be806fb0e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJpZGUlMjBmbGFnfGVufDB8fDB8fHww', alt: 'Broadcast 2' },
  { src: '', alt: 'Broadcast 3' }
];

const highlightedMessages = [
    {
        title:"Pride Is Coming!",
        message:"<p><b>T</b>o those who had to hide, this space is for you.<br>I used to daydream about Pride from the shadows, wondering if freedom, love, and visibility would ever belong to me. Back then, it felt impossible.<br><br>But now, Pride Month is around the corner, and it’s our time to be loud, bold, and unapologetically ourselves. Not just for us, but for those still hiding, still silenced, still surviving.<br><br>This June, we celebrate so they can feel us, so they know they’re not alone.<br><br>Get ready. Let your joy be radical. Let your love be loud.<br><br>Explore this space. <strong>Pride is coming!</strong></p>",
        date:"2025-05-08",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"Stand Against Hate !",
        message:"<p><b>T</b>oday is <strong>International Day Against Homophobia, Biphobia, and Transphobia!</strong> To those whose existence has been debated, denied, or dismissed, this space is for you.<br><br>Today reminds us that being queer still costs too much.<br>But we’re here. We’re still here. And we won’t be silent about the harm or the healing.<br><br> <strong>You belong here</strong>.</p>",
        date:"2025-05-17",
        src:"https://images.unsplash.com/photo-1594329776174-2c52e9e9ed03?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYW5zcGhvYmlhfGVufDB8fDB8fHww"
    },{
        title:"Pride Is Coming!",
        message:"<p><b>I</b> used to daydream about Pride from the shadows, wondering if freedom, love, and visibility would ever belong to me. Back then, it felt impossible.<br><br>But now, Pride Month is around the corner, and it’s our time to be loud, bold, and unapologetically ourselves. Not just for us, but for those still hiding, still silenced, still surviving.<br><br>This June, we celebrate so they can feel us, so they know they’re not alone.<br><br>Get ready. Let your joy be radical. Let your love be loud.<br><br><strong>Pride is coming!</strong></p>",
        date:"2025-05-18",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"Pride Is Here!",
        message:"<p><b>T</b>o those who had to hide, this space is for you.<br>I grew up watching Pride from a distance, hoping one day I could live that kind of truth. Today, I do.<br><br>Pride Month is here, and it means everything. It’s a celebration, yes. But it’s also a protest, a memory, a promise. We show up for ourselves, and for those who can’t yet show up for themselves.<br>We dance so others can breathe. We shine so others can see the way.<br><br><strong>Pride is now!</strong>.</p>",
        date:"2025-06-01",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"It's Laju’s Birthday!",
        message:"<p><b>T</b>o the girl who didn’t know she’d make it, happy birthday.<br><br>This life is mine now. Messy, soft, loud, queer, sacred.<br><br>Thanks for growing with me. Dear reader, explore this space. <br><br><b>I made it with love</b>.</p>",
        date:"2025-06-14",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"It's pride month!",
        message:"<p><b>T</b>o those who had to hide, this space is for you.<br>I grew up watching Pride from a distance, hoping one day I could live that kind of truth. Today, I do.<br><br>Pride Month is here, and it means everything. It’s a celebration, yes. But it’s also a protest, a memory, a promise. We show up for ourselves, and for those who can’t yet show up for themselves.<br>We dance so others can breathe. We shine so others can see the way.<br><br><strong>Pride is now!</strong>.</p>",
        date:"2025-06-15",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"Juneteenth",
        message:"<p><b>T</b>o be Black and queer is to carry both history and fire.<br><br>Juneteenth is freedom, but it’s also unfinished work.<br><br>So today, I rest. I remember. I rise again, joyful and unafraid.<br><br> <strong>You are part of this story too</strong>.</p>",
        date:"2025-06-19",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"Black History Month",
        message:"<p><b>T</b>o be Black and queer is to write our own language.<br><br>This month, we honour the voices that shaped us, even when the world refused to listen.<br><br>We’re still here. Still creating. Still choosing joy.<br><br> <strong>You’re walking legacy</strong.</p>",
        date:"2025-10-01",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"International Lesbian Day",
        message:"<p><b>T</b>o every girl who didn’t have the words, this space is for you.<br><br>Being a lesbian isn’t just an identity. It’s a home. A heartbeat. A kind of knowing.<br><br>Today, we honour that truth, loud, soft, complicated, and real.<br><br></p>",
        date:"2025-10-08",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"National Coming Out Day",
        message:"<p><b>C</b>oming out isn’t always a moment. Sometimes it’s a process. Sometimes it’s survival.<br><br>And sometimes, it’s just quietly choosing yourself again and again.<br><br>However you show up, that’s enough.<br><br> <strong>You are the story.</strong></p>",
        date:"2025-10-11",
        src:"https://plus.unsplash.com/premium_photo-1714047307321-d878a7f93e50?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJsYWNrJTIwbGVzYmlhbiUyMGNvdXBsZSUyMGF0JTIwcHJpZGV8ZW58MHx8MHx8fDA%3D"
    }
]

const BroadcastHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      document.documentElement.style.setProperty('--current-image', `url(${images[index]})`);
      index = (index + 1) % images.length;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    // <section className="hero container">
    //   <div className="grid-2">
    //     <div>
    //     <h1 className='hero-title'><span>{highlightedMessages.filter(o => o.date >= new Date().toISOString().split('T')[0]).sort((a, b) => a.date.localeCompare(b.date))[0]['title']}</span></h1>
    //       <div dangerouslySetInnerHTML={{ __html:highlightedMessages.filter(o => o.date >= new Date().toISOString().split('T')[0]).sort((a, b) => a.date.localeCompare(b.date))[0]['message']}} />
    //       {/* <button className="btn" onClick={() => document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' })}>
    //         Explore Broadcasts
    //       </button> */}
    //     </div>

    //     <div className="carousel-wrapper" id="carousel">
    //       <div className="carousel" style={{ transform: `translateX(-${current * 100}%)` }}>
    //         {images.map((img, index) => (
    //           <div
    //             key={index}
    //             className={`carousel-item ${index === current ? 'active' : ''}`}
    //           >
    //             {index < 2 ? <img src={img.src} alt={img.alt} />:<img src={highlightedMessages.filter(o => o.date >= new Date().toISOString().split('T')[0]).sort((a, b) => a.date.localeCompare(b.date))[0]['src']} alt={highlightedMessages.filter(o => o.date >= new Date().toISOString().split('T')[0]).sort((a, b) => a.date.localeCompare(b.date))[0]['title']} />}
    //           </div>
    //         ))}
    //       </div>
    //       <div className="carousel-controls">
    //         <button className="control-btn" onClick={prev}>&#10094;</button>
    //         <button className="control-btn" onClick={next}>&#10095;</button>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="hero container broadcast-hero">
  <div className="grid-2 hero-content-wrapper">
    <div>
      <h1 className="hero-title">
        <span>
          {
            highlightedMessages
              .filter(o => o.date >= new Date().toISOString().split('T')[0])
              .sort((a, b) => a.date.localeCompare(b.date))[0]['title']
          }
        </span>
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: highlightedMessages
            .filter(o => o.date >= new Date().toISOString().split('T')[0])
            .sort((a, b) => a.date.localeCompare(b.date))[0]['message']
        }}
      />
      {/* Optional CTA button */}
      {/* <button className="btn" onClick={() => document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' })}>
        Explore Broadcasts
      </button> */}
    </div>

    <div className="carousel-wrapper" id="carousel">
      <div className="carousel" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === current ? 'active' : ''}`}
          >
            {index < 2 ? (
              <img src={img.src} alt={img.alt} />
            ) : (
              <img
                src={
                  highlightedMessages
                    .filter(o => o.date >= new Date().toISOString().split('T')[0])
                    .sort((a, b) => a.date.localeCompare(b.date))[0]['src']
                }
                alt={
                  highlightedMessages
                    .filter(o => o.date >= new Date().toISOString().split('T')[0])
                    .sort((a, b) => a.date.localeCompare(b.date))[0]['title']
                }
              />
            )}
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="control-btn" onClick={prev}>&#10094;</button>
        <button className="control-btn" onClick={next}>&#10095;</button>
      </div>
    </div>
  </div>
</section>

  );
};

export default BroadcastHero;
