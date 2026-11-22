import { SERVICES } from "../data.js";
import { Icon } from "./Icons.jsx";

export function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <header className="section-head" data-animate>
          <p className="kicker">What I do</p>
          <h2>Work I can own on a team.</h2>
          <p>I can take a feature from the screen to the database, or join a team that already has one of those pieces.</p>
        </header>
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <article
              key={service.title}
              className="service-card"
              data-animate={index % 2 === 0 ? "up" : "right"}
              data-delay={(index % 3) * 80}
            >
              <span className="service-icon" aria-hidden="true">
                <Icon name={service.icon} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
