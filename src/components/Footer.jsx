export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="container footer-inner">
        <a className="logo" href="#top">
          Dhivya<span>.</span>
        </a>
        <nav aria-label="Footer">
          <a href="#works">Projects</a>
          <a href="#resume">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="text">© {year} M Dhivya. All rights reserved.</p>
      </div>
    </footer>
  );
}
