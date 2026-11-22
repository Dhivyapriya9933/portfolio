import { EDUCATION, EXPERIENCE, RESUME } from "../data.js";

export function Resume() {
  return (
    <section id="resume" className="section resume">
      <div className="container">
        <header className="section-head" data-animate>
          <p className="kicker">Experience</p>
          <h2>Roles, in order.</h2>
          <p>Newest first. Each line is something I can walk through in an interview.</p>
          <p>
            <a className="btn-outline" href={RESUME} download="M-Dhivya-Resume.pdf">
              Download resume
            </a>
          </p>
        </header>
        <div className="resume-grid">
          <div>
            <h3 className="col-label" data-animate="left">Experience</h3>
            <ol className="timeline">
              {EXPERIENCE.map((role, index) => (
                <li key={role.title + role.when} data-animate="left" data-delay={index * 90}>
                  <p className="when">{role.when}</p>
                  <h4>{role.title}</h4>
                  <p className="where">{role.where}</p>
                  <ul className="duty">
                    {role.duties.map((duty) => (
                      <li key={duty}>{duty}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="col-label" data-animate="right">Education</h3>
            <ol className="timeline">
              {EDUCATION.map((item, index) => (
                <li key={item.when} data-animate="right" data-delay={index * 90}>
                  <p className="when">{item.when}</p>
                  <h4>{item.title}</h4>
                  <p className="where">{item.where}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
