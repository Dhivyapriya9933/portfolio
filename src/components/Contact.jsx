import { useState } from "react";
import { EMAIL, PHONE_HREF, PHONE_LABEL, RESUME } from "../data.js";
import { Icon } from "./Icons.jsx";

export function Contact() {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState("");

  function readMessage(form) {
    if (!form.reportValidity()) return null;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    return {
      subject,
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };
  }

  function openMail(kind, event) {
    event.preventDefault();
    const message = readMessage(event.currentTarget.form);
    if (!message) return;

    const to = encodeURIComponent(EMAIL);
    const subject = encodeURIComponent(message.subject);
    const body = encodeURIComponent(message.body);

    if (kind === "gmail") {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
        "_blank",
        "noopener,noreferrer"
      );
      setStatus("Gmail should open in a new tab with this message. Sign in if it asks.");
      return;
    }

    if (kind === "outlook") {
      const compose = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`;
      window.open(
        `https://login.live.com/login.srf?wa=wsignin1.0&wreply=${encodeURIComponent(compose)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setStatus("Outlook should open in a new tab with this message. Sign in if it asks.");
      return;
    }

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus(`Your email app should open with this message. If it doesn't, write to ${EMAIL}.`);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied("Email copied.");
    } catch {
      setCopied(EMAIL);
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <div data-animate="up">
            <p className="kicker">Contact</p>
            <h2>Let’s talk about a role.</h2>
            <p className="about-text">Full-time, freelance, or a specific build. Send a note and I will reply. The resume is ready to download.</p>
          </div>
          <ul className="contact-list">
            <li data-animate="left">
              <span className="service-icon" aria-hidden="true">
                <Icon name="mail" />
              </span>
              <div>
                <span className="contact-label">Email</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button type="button" className="copy-btn" onClick={copyEmail}>
                  Copy
                </button>
              </div>
            </li>
            <li data-animate="left" data-delay="70">
              <span className="service-icon" aria-hidden="true">
                <Icon name="call" />
              </span>
              <div>
                <span className="contact-label">Phone</span>
                <a href={PHONE_HREF}>{PHONE_LABEL}</a>
              </div>
            </li>
            <li data-animate="left" data-delay="140">
              <span className="service-icon" aria-hidden="true">
                <Icon name="download" />
              </span>
              <div>
                <span className="contact-label">Resume</span>
                <a href={RESUME} download="M-Dhivya-Resume.pdf">
                  Download PDF
                </a>
              </div>
            </li>
            <li data-animate="left" data-delay="210">
              <span className="service-icon" aria-hidden="true">
                <Icon name="pin" />
              </span>
              <div>
                <span className="contact-label">Location</span>
                <span>Ramapuram, Chennai</span>
              </div>
            </li>
          </ul>
          <p className="copy-status" role="status">
            {copied}
          </p>
        </div>

        <form id="contactForm" className="contact-form" onSubmit={(event) => openMail("app", event)} data-animate="right" noValidate>
          <div className="field">
            <label htmlFor="txtname">Name</label>
            <input className="form-control" id="txtname" name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={80} />
          </div>
          <div className="field">
            <label htmlFor="txtemail">Email</label>
            <input className="form-control" id="txtemail" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
          </div>
          <div className="field">
            <label htmlFor="txtsubject">Subject</label>
            <input className="form-control" id="txtsubject" name="subject" type="text" placeholder="What should we build?" required maxLength={120} />
          </div>
          <div className="field">
            <label htmlFor="txtmessage">Message</label>
            <textarea className="form-control" id="txtmessage" name="message" placeholder="A little context helps — timeline, product, and what you need." required minLength={10} rows={5}></textarea>
          </div>
          <div className="send-row">
            <button type="submit" className="btn-solid">
              Email app
            </button>
            <button type="button" className="btn-outline" onClick={(event) => openMail("gmail", event)}>
              Gmail
            </button>
            <button type="button" className="btn-outline" onClick={(event) => openMail("outlook", event)}>
              Outlook
            </button>
          </div>
          <p className="form-hint">Opens your email app, or Gmail or Outlook in the browser, with this message ready to send.</p>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
