import Header from './Header';
import Hero from './Hero';
import WeeklyHighlight from './WeeklyHighlight';
import Events from './Events';
import Gallery from './Gallery';
import Music from './Music';
import Footer from './Footer';
import BroadcastHero from './BroadcastHero';


const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <BroadcastHero />
      <Hero />
      {/* <WeeklyHighlight /> */}
      <Events />
      <Gallery />
      {/* <Music /> */}
      <Footer />
      {children}
    </>
  );
};

export default AppLayout;