import { useEffect, useState } from "react";
import { NAV } from "../data.js";

export function useSite(setNavOpen) {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function paintScroll() {
      frame = 0;
      const y = window.scrollY;
      const bar = document.getElementById("scrollBar");
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      }

      const nextScrolled = y > 12;
      const nextTop = y >= 500;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      setShowTop((prev) => (prev === nextTop ? prev : nextTop));

      const mark = y + 140;
      let current = "";
      NAV.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= mark) current = item.id;
      });
      setActive((prev) => (prev === current ? prev : current));
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(paintScroll);
    }

    function onKey(event) {
      if (event.key === "Escape") setNavOpen(false);
    }

    function onAnchor(event) {
      const link = event.target.closest("a[href^='#']");
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const id = link.getAttribute("href").slice(1);
      const target = id === "top" ? document.getElementById("top") : document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onAnchor);

    const nodes = document.querySelectorAll("[data-animate]");
    let observer;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("inview"));
    } else {
      function play(el) {
        const delay = el.getAttribute("data-delay");
        el.style.transitionDelay = delay ? `${delay}ms` : "0ms";
        el.classList.add("is-reset");
        el.classList.remove("inview");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.classList.remove("is-reset");
            el.classList.add("inview");
          });
        });
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
              if (!el.classList.contains("inview")) play(el);
              return;
            }
            if (el.classList.contains("inview")) {
              el.classList.add("is-reset");
              el.classList.remove("inview");
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
      );
      nodes.forEach((el) => observer.observe(el));
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onAnchor);
      observer?.disconnect();
    };
  }, [setNavOpen]);

  function scrollTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return { scrolled, showTop, active, scrollTop };
}
