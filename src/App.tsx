import { CaseStudy } from "./components/CaseStudy";
import { projectUrl } from "./routes";
import { useEffect, useState } from "react";
import { projects } from "./content";
import { Header, Footer } from "./components/Layout";
import { Hero } from "./components/Hero";
import { Work } from "./components/Projects";
import { About } from "./components/About";
import { Approach } from "./components/Approach";
import { ContactSection, ContactModal } from "./components/Contact";

function projectFromUrl() {
  const path = window.location.pathname
    .replace(import.meta.env.BASE_URL, "")
    .replace(/\/index\.html$/, "")
    .replace(/\/$/, "");
  const legacyId = new URLSearchParams(window.location.search).get("project");
  return (
    projects.find(
      (project) => project.sourcePath === path || project.id === legacyId,
    ) ?? null
  );
}
export default function App() {
  const project = projectFromUrl();
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme remains functional without storage. */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f4f3f0" : "#171717");
  }, [theme]);
  useEffect(() => {
    document.title = project
      ? `${project.name} — Joseph Smith`
      : "Joseph Smith — Senior Product Designer";
  }, [project]);
  useEffect(() => {
    if (project && new URLSearchParams(window.location.search).has("project")) {
      window.location.replace(projectUrl(project));
    }
  }, [project]);
  const openContact = () => setContactOpen(true);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        projectPage={!!project}
        onContact={openContact}
        theme={theme}
        toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <main id="main">
        {project ? (
          <CaseStudy project={project} />
        ) : (
          <>
            <Hero />
            <Work />
            <About onContact={openContact} />
            <Approach />
            <ContactSection onContact={openContact} />
          </>
        )}
      </main>
      <Footer />
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}
