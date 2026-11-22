import { useCallback, useEffect, useState } from "react";
import { TECH } from "./data.js";
import { useSite } from "./hooks/useSite.js";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { About } from "./components/About.jsx";
import { Services } from "./components/Services.jsx";
import { Skills } from "./components/Skills.jsx";
import { Projects } from "./components/Projects.jsx";
import { ProjectDialog } from "./components/ProjectDialog.jsx";
import { Resume } from "./components/Resume.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";
import { Icon } from "./components/Icons.jsx";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [project, setProject] = useState(null);
  const closeProject = useCallback(() => setProject(null), []);
  const { scrolled, showTop, active, scrollTop } = useSite(setNavOpen);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
  }, [navOpen]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <span id="scrollBar"></span>
      </div>
      <Header scrolled={scrolled} active={active} open={navOpen} setOpen={setNavOpen} />
      <main id="main">
        <Hero />
        <div className="tech-band" aria-label="Technologies">
          <ul>
            {TECH.map((item, index) => (
              <li key={item} data-animate="up" data-delay={index * 60}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <About />
        <Services />
        <Skills />
        <Projects onOpen={setProject} />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <button type="button" className="to-top" aria-label="Back to top" hidden={!showTop} onClick={scrollTop}>
        <Icon name="up" />
      </button>
      <ProjectDialog project={project} onClose={closeProject} />
    </>
  );
}
