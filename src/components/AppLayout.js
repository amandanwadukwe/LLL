import Header from './Header';
import Hero from './Hero';
import WeeklyHighlight from './WeeklyHighlight';
import Events from './Events';
import Gallery from './Gallery';
import Music from './Music';
import Footer from './Footer';

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
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