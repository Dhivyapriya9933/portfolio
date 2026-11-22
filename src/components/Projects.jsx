import { useEffect, useState } from "react";
import { FILTERS, PROJECTS, imagePath } from "../data.js";

export function Projects({ onOpen }) {
  const [filter, setFilter] = useState("all");

  const visible = PROJECTS.filter((project) => filter === "all" || project.tags.includes(filter));

  useEffect(() => {
    if (filter === "all") return;
    document.querySelectorAll(".work-card:not(.is-hidden)").forEach((card) => card.classList.add("inview"));
  }, [filter]);

  return (
    <section id="works" className="section projects">
      <div className="container">
        <header className="section-head" data-animate>
          <p className="kicker">Projects</p>
          <h2>Proof I can show.</h2>
          <p>Each card is a product I built. The first line says what it is. Open a card to see the full image.</p>
        </header>
        <div className="filters" role="toolbar" aria-label="Filter projects" data-animate>
          {FILTERS.map((item) => {
            const on = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`filter${on ? " is-active" : ""}`}
                aria-pressed={on}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                {item.count ? <span>{item.count}</span> : null}
              </button>
            );
          })}
        </div>
        <p className="work-count" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
        <div className="work-grid">
          {PROJECTS.map((project, index) => {
            const hidden = filter !== "all" && !project.tags.includes(filter);
            const motion = ["up", "left", "right"][index % 3];
            return (
              <article
                key={project.id}
                className={`work-card${hidden ? " is-hidden" : ""}`}
                data-animate={motion}
                data-delay={(index % 3) * 80}
              >
                {project.note ? (
                  <div className="work-media work-media-note">
                    <span>In progress</span>
                    <strong>CRM</strong>
                  </div>
                ) : (
                  <div className="work-media">
                    <img
                      src={imagePath(project.image)}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="work-body">
                  <p className="work-kicker">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="tags">
                    {project.chips.map((chip) => (
                      <li key={chip}>{chip}</li>
                    ))}
                  </ul>
                </div>
                <button type="button" className="work-hit" aria-label={`View ${project.title}`} onClick={() => onOpen(project)}>
                  View
                </button>
              </article>
            );
          })}
        </div>
        <p className="work-empty" hidden={visible.length !== 0}>
          Nothing in this group. Try another filter.
        </p>
      </div>
    </section>
  );
}
