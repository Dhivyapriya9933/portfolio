import { NAV } from "../data.js";

export function Header({ scrolled, active, open, setOpen }) {
  return (
    <header id="header" className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="logo" href="#top">
          Dhivya<span>.</span>
        </a>
        <nav className="site-nav" id="nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={active === item.id ? "is-active" : undefined}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn-solid btn-small header-cta" href="#contact">
          Contact
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
