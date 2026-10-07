import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Asterisk, Check, Copy } from "lucide-react";
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
  const [draft, setDraft] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDraft(
      `Hi ${site.name},\n\n${String(data.get("message")).trim()}\n\n${String(data.get("name")).trim()}\n${String(data.get("email")).trim()}`,
    );
    setCopyState("idle");
  }
  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }
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
      {!draft ? (
        <>
          <p className="contact-modal-description">
            {site.email
              ? "Tell me a little about what you have in mind. I’ll create a note you can send from your email app."
              : "Share your vision, your challenge, or what comes next. Prepare a personal introduction to share with me on LinkedIn."}
          </p>
          <a
            className="contact-linkedin"
            href={site.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn <ArrowUpRight size={18} />
          </a>
          <div className="form-divider">
            <span>START WITH AN INTRODUCTION</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Name"
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                  placeholder="Email"
                />
              </label>
            </div>
            <label>
              What’s on your mind?
              <textarea
                name="message"
                rows={4}
                required
                maxLength={4000}
                placeholder="A little about your idea, challenge, or opportunity…"
              />
            </label>
            <button className="button button-primary" type="submit">
              Create my note <ArrowRight size={18} />
            </button>
            <p className="form-note">
              This creates a draft only. Nothing is sent or saved.
            </p>
          </form>
        </>
      ) : (
        <div className="contact-draft">
          <div className="draft-ready">
            <span>
              <Check size={19} />
            </span>
            <div>
              <strong>Your note is ready.</strong>
              <p>
                {site.email
                  ? "Send it with your email app, or copy it for later."
                  : "Copy your note and share it in a LinkedIn message to Joseph."}
              </p>
            </div>
          </div>
          <label>
            Message preview
            <textarea value={draft} readOnly rows={8} />
          </label>
          <div className="draft-actions">
            <button className="button button-primary" onClick={copyDraft}>
              {copyState === "copied" ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
              {copyState === "copied" ? "Copied to clipboard" : "Copy my note"}
            </button>
          </div>
          <p className="copy-feedback" role="status">
            {copyState === "copied"
              ? "Message copied. You can now paste it into your messaging app."
              : copyState === "error"
                ? "Clipboard access is unavailable. Select and copy the message above."
                : ""}
          </p>
        </div>
      )}
    </Modal>
  );
}
