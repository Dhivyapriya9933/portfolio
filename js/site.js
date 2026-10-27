(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.getElementById("header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("toTop");
  var scrollBar = document.getElementById("scrollBar");
  var year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 12);
    if (toTop) toTop.hidden = y < 500;
    if (scrollBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      scrollBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }
    spy();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(!document.body.classList.contains("nav-open"));
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setNav(false); });
  });

  var spyItems = navLinks.map(function (link) {
    return { link: link, el: document.querySelector(link.getAttribute("href")) };
  }).filter(function (item) { return item.el; });

  function spy() {
    var mark = window.scrollY + 140;
    var current = null;
    spyItems.forEach(function (item) {
      if (item.el.offsetTop <= mark) current = item;
    });
    spyItems.forEach(function (item) {
      var on = item === current;
      item.link.classList.toggle("is-active", on);
      if (on) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
    });
  }

  /* Reveal + skill bars */
  var animated = document.querySelectorAll("[data-animate]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    animated.forEach(function (el) { el.classList.add("inview"); });
  } else {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = entry.target.getAttribute("data-delay");
        if (delay) entry.target.style.transitionDelay = delay + "ms";
        entry.target.classList.add("inview");
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    animated.forEach(function (el) { reveal.observe(el); });
  }

  /* Count-up */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var prefix = el.getAttribute("data-prefix") || "";
    if (isNaN(target)) return;
    if (reduceMotion) {
      el.textContent = prefix + target;
      return;
    }
    var start = performance.now();
    function frame(now) {
      var t = Math.min(1, (now - start) / 1200);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var stats = document.querySelectorAll("[data-count]");
  var statsBar = document.querySelector(".stats-bar");
  if (stats.length && statsBar && "IntersectionObserver" in window) {
    var statsObs = new IntersectionObserver(function (entries) {
      if (!entries.some(function (e) { return e.isIntersecting; })) return;
      stats.forEach(animateCount);
      statsObs.disconnect();
    }, { threshold: 0.4 });
    statsObs.observe(statsBar);
  }

  /* Project filters */
  var cards = Array.prototype.slice.call(document.querySelectorAll(".work-card"));
  var filters = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  var workCount = document.getElementById("workCount");
  var workEmpty = document.getElementById("workEmpty");

  function applyFilter(name) {
    var shown = 0;
    cards.forEach(function (card) {
      var tags = (card.getAttribute("data-tags") || "").split(/\s+/);
      var visible = name === "all" || tags.indexOf(name) !== -1;
      card.classList.toggle("is-hidden", !visible);
      if (visible) {
        shown += 1;
        if (name !== "all") card.classList.add("inview");
      }
    });
    if (workCount) {
      workCount.textContent = shown + (shown === 1 ? " project" : " projects");
    }
    if (workEmpty) workEmpty.hidden = shown !== 0;
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
  applyFilter("all");

  /* Project dialog */
  var dialog = document.getElementById("projectDialog");
  var dialogImg = document.getElementById("dialogImg");
  var dialogTitle = document.getElementById("dialogTitle");
  var dialogCopy = document.getElementById("dialogCopy");
  var dialogKicker = document.getElementById("dialogKicker");
  var dialogTags = document.getElementById("dialogTags");
  var dialogLive = document.getElementById("dialogLive");
  var dialogClose = document.getElementById("dialogClose");

  function openProject(card) {
    if (!dialog || !card) return;
    var img = card.querySelector("img");
    var title = card.querySelector("h3");
    var copy = card.querySelector(".work-body p:not(.work-kicker)");
    var kicker = card.querySelector(".work-kicker");
    var tags = card.querySelector(".tags");
    if (dialogImg) {
      if (img) {
        dialogImg.hidden = false;
        dialogImg.src = img.src;
        dialogImg.alt = img.alt;
      } else {
        dialogImg.hidden = true;
        dialogImg.removeAttribute("src");
        dialogImg.alt = "";
      }
    }
    if (dialogTitle && title) dialogTitle.textContent = title.textContent;
    if (dialogCopy && copy) dialogCopy.textContent = copy.textContent;
    if (dialogKicker && kicker) dialogKicker.textContent = kicker.textContent;
    if (dialogTags && tags) dialogTags.innerHTML = tags.innerHTML;
    if (dialogLive) {
      var liveLink = dialogLive.querySelector("a");
      var live = card.getAttribute("data-live");
      if (live && liveLink) {
        liveLink.href = live;
        dialogLive.hidden = false;
      } else {
        dialogLive.hidden = true;
        if (liveLink) liveLink.removeAttribute("href");
      }
    }
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  cards.forEach(function (card) {
    var hit = card.querySelector(".work-hit");
    if (!hit) return;
    hit.addEventListener("click", function () { openProject(card); });
  });

  if (dialogClose && dialog) {
    dialogClose.addEventListener("click", function () { dialog.close(); });
  }

  if (dialog) {
    dialog.addEventListener("click", function (e) {
      var rect = dialog.getBoundingClientRect();
      var inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (dialogImg) dialogImg.removeAttribute("src");
    });
  }

  /* Contact */
  var form = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) return;
      e.preventDefault();
      var name = document.getElementById("txtname").value.trim();
      var email = document.getElementById("txtemail").value.trim();
      var subject = document.getElementById("txtsubject").value.trim();
      var message = document.getElementById("txtmessage").value.trim();
      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
      window.location.href = "mailto:dhivyapriya0303@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      if (formStatus) {
        formStatus.classList.remove("is-error");
        formStatus.textContent = "Your email app should open with this message. If it doesn't, write to dhivyapriya0303@gmail.com.";
      }
    });
  }

  var copyBtn = document.getElementById("copyEmail");
  var copyStatus = document.getElementById("copyStatus");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var value = copyBtn.getAttribute("data-copy") || "";
      function done(ok) {
        if (!copyStatus) return;
        copyStatus.textContent = ok ? "Email copied." : value;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done(true); }).catch(function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  onScroll();
})();
