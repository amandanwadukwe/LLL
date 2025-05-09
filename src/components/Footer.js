const Footer = () => {
    return (
      <footer>
        <div className="container">
          <div className="footer-links">
            <span style={{cursor:"pointer"}} onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About</span>
            {/* <a href="#">Submit</a>
            <a href="#">Contact</a> */}
            <a href="https://www.instagram.com/lush_loud_laju/" target="_blank">Instagram</a>
          </div>
          <p>© 2025 <strong>LUSH & LOUD by LAJU</strong></p>
        </div>
      </footer>
    );
  };
  
  export default Footer;