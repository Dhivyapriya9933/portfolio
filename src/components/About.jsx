import { EMAIL, PHONE_HREF, PHONE_LABEL, RESUME } from "../data.js";

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div>
          <div data-animate="up">
            <p className="kicker">About</p>
            <h2>The short version.</h2>
            <p className="about-text">
              I am a full stack developer in Chennai. I take a product from the interface to the API, then keep it running. Most of my shipped work is for live events. Right now I am also building a CRM.
            </p>
          </div>
          <ul className="talk-list">
            {[
              ["Role.", "Full Stack Developer, 4+ years."],
              ["Now.", "bilimbe, Jan 2025 to present. Building a CRM, plus event products."],
              ["Before.", "Software Engineer at Us Global Solutions, May 2022 to Jan 2025."],
              ["Stack.", "React, React Native, Node.js, MongoDB, JavaScript, REST APIs. Also Angular and Python."],
              ["Degree.", "B.E. Computer Science, University College of Engineering, 2019."],
              ["Languages.", "Tamil and English. Based in Ramapuram, Chennai."],
            ].map(([label, text], index) => (
              <li key={label} data-animate="left" data-delay={index * 70}>
                <strong>{label}</strong> {text}
              </li>
            ))}
          </ul>
        </div>
        <aside className="glance">
          <h3 data-animate="right">At a glance</h3>
          <dl>
            {[
              ["Role", "Full Stack Developer"],
              ["Now", "CRM at bilimbe"],
              ["Based", "Ramapuram, Chennai"],
              ["Languages", "Tamil, English"],
              ["Open to", "Full-time and freelance"],
            ].map(([label, value], index) => (
              <div key={label} data-animate="right" data-delay={index * 60}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div data-animate="right" data-delay="300">
              <dt>Resume</dt>
              <dd>
                <a href={RESUME} download="M-Dhivya-Resume.pdf">
                  Download PDF
                </a>
              </dd>
            </div>
            <div data-animate="right" data-delay="360">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div data-animate="right" data-delay="420">
              <dt>Phone</dt>
              <dd>
                <a href={PHONE_HREF}>{PHONE_LABEL}</a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
