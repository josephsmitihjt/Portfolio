import { ArrowUpRight, Asterisk } from "lucide-react";
import { site } from "../content";
import { Reveal, Modal } from "./shared";

export function ContactSection({ onContact }: { onContact: () => void }) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <Reveal>
          <div className="contact-topline">
            <span className="eyebrow">
              A GOOD CONVERSATION IS A GREAT START
            </span>
            <span aria-hidden="true">
              <Asterisk size={38} />
            </span>
          </div>
          <div className="contact-main">
            <h2 id="contact-title">
              Have something
              <br />
              in mind? <span>Let’s talk.</span>
            </h2>
          </div>
          <div className="contact-bottom">
            <p>
              A complex challenge. An interesting idea.
              <br />
              Or simply a hello. I’d love to hear it.
            </p>
            <button className="button button-contact" onClick={onContact}>
              Start a conversation <ArrowUpRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal
      title="Let’s connect for a path forward"
      onClose={onClose}
      className="contact-modal"
    >
      <span className="eyebrow">A CONVERSATION WITH PURPOSE</span>
      <h2>
        Let’s connect for a <span>path forward.</span>
      </h2>
      <p className="contact-modal-description">
        Whether you’re exploring an opportunity, shaping a product, or looking
        for a fresh perspective, I’d love to hear what you have in mind.
      </p>
      <a
        className="contact-linkedin"
        href={site.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="linkedin-window-note"
      >
        Connect on LinkedIn <ArrowUpRight size={18} />
      </a>
      <span className="sr-only" id="linkedin-window-note">
        Opens in a new tab.
      </span>
      <div className="form-divider">
        <span>OR SHARE A FEW DETAILS</span>
      </div>
      <p className="contact-form-intro">
        Share a few details about yourself and what comes next through my
        contact form.
      </p>
      <a
        className="button button-primary contact-form-link"
        href={site.contactForm}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="contact-form-note"
      >
        Open contact form <ArrowUpRight size={18} />
      </a>
      <p className="form-note" id="contact-form-note">
        Opens in a new tab in Google Forms.
      </p>
    </Modal>
  );
}
