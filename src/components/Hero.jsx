import { RESUME } from "../data.js";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="ambient ambient-1" aria-hidden="true"></div>
      <div className="ambient ambient-2" aria-hidden="true"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" aria-hidden="true"></span> Open to full-time roles and freelance
          </p>
          <h1 id="hero-title">
            Hi, I'm <span className="name">Dhivya</span>
            <span className="mark">.</span>
          </h1>
          <p className="role">Full Stack Developer · 4+ years · Chennai</p>
          <p className="lede">
            I build web and mobile products from the screen to the API. My day-to-day stack is React, React Native, Node.js, and MongoDB. I am a Full Stack Developer at bilimbe, building a CRM and event products.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-solid">
              Contact me
            </a>
            <a className="btn-outline" href={RESUME} download="M-Dhivya-Resume.pdf">
              Download resume
            </a>
            <a href="#resume" className="btn-outline">
              See experience
            </a>
          </div>
          <ul className="hero-meta">
            <li>B.E. Computer Science</li>
            <li>Tamil &amp; English</li>
            <li>Ramapuram, Chennai</li>
          </ul>
        </div>
        <figure className="portrait">
          <div className="portrait-glow" aria-hidden="true"></div>
          <div className="portrait-frame">
            <img src="/images/profile.jpg" alt="Portrait of M Dhivya" width="1080" height="1600" fetchPriority="high" />
          </div>
          <figcaption className="portrait-badge">
            <span className="dot" aria-hidden="true"></span> Building a CRM at bilimbe
          </figcaption>
        </figure>
      </div>
      <div className="container">
        <div className="stats-bar">
          {[
            ["4+ yrs", "Full stack experience"],
            ["B.E.", "Computer Science, 2019"],
            ["Now", "CRM at bilimbe"],
            ["Stack", "React, Node, MongoDB"],
          ].map(([value, label], index) => (
            <div key={value} className="stat-item" data-animate="up" data-delay={index * 80}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
