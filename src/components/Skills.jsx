import { SKILLS } from "../data.js";

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <header className="section-head" data-animate>
          <p className="kicker">Skills</p>
          <h2>Tools I use on the job.</h2>
          <p>These are the ones I use to ship. Angular and Python come up on some projects too.</p>
        </header>
        <div className="skills-grid">
          {SKILLS.map((group) => (
            <div key={group.title} className="skill-panel">
              <h3 data-animate="up">{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item, index) => (
                  <li key={item.name} data-animate="up" data-delay={index * 90}>
                    <div className="skill-meta">
                      <span>{item.name}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className="skill-track" role="img" aria-label={`${item.name}, ${item.level} percent`}>
                      <span style={{ "--w": `${item.level}%` }}></span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
