import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { site } from "../content";

export function Header({
  onContact,
  theme,
  toggleTheme,
}: {
  onContact: () => void;
  theme: string;
  toggleTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    ["home", "work", "about", "approach"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const resize = () => {
      if (window.innerWidth > 700) setMenuOpen(false);
    };
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a
          className="wordmark"
          href="#home"
          aria-label={`${site.name}, home`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="wordmark-symbol">
            js<span>®</span>
          </span>
          <span className="wordmark-name">
            Joseph Smith<span>PRODUCT DESIGN & STRATEGY</span>
          </span>
        </a>
        <nav
          className={`navigation ${menuOpen ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {[
            ["work", "Projects"],
            ["about", "About"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Resume <ArrowUpRight size={12} />
          </a>
          <button
            className="nav-contact"
            onClick={() => {
              setMenuOpen(false);
              onContact();
            }}
          >
            Let’s talk <ArrowUpRight size={16} />
          </button>
        </nav>
        <div className="header-controls">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <a className="footer-brand" href="#home">
          Joseph Smith
          <span>
            Senior Product Designer
            <br />
            Product leadership & strategy
          </span>
        </a>
        <div className="footer-links">
          <a href="#work">Projects</a>
          <a href="#about">About</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer">
            Resume <ArrowUpRight size={13} />
          </a>
          <a href={site.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Joseph Smith</span>
        <span>AUSTIN, TEXAS · DESIGNED WITH INTENTION</span>
        <a href="#home">
          Back to top <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}
