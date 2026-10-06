import { useEffect, useState } from "react";
import { projects, type Project } from "./content";
import { Header, Footer } from "./components/Layout";
import { Hero } from "./components/Hero";
import { Work, ProjectModal } from "./components/Projects";
import { About } from "./components/About";
import { Approach } from "./components/Approach";
import { ContactSection, ContactModal } from "./components/Contact";

function projectFromUrl() {
  const id = new URLSearchParams(window.location.search).get("project");
  return projects.find((project) => project.id === id) ?? null;
}
export default function App() {
  const [project, setProject] = useState<Project | null>(projectFromUrl);
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
    const handleHistory = () => setProject(projectFromUrl());
    window.addEventListener("popstate", handleHistory);
    return () => window.removeEventListener("popstate", handleHistory);
  }, []);
  useEffect(() => {
    document.title = project
      ? `${project.name} — Joseph Smith`
      : "Joseph Smith — Senior Product Designer";
  }, [project]);
  function selectProject(next: Project | null) {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("project", next.id);
    else url.searchParams.delete("project");
    window.history.pushState({}, "", url);
    setProject(next);
  }
  const openContact = () => setContactOpen(true);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        onContact={openContact}
        theme={theme}
        toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <main id="main">
        <Hero />
        <Work onSelect={selectProject} />
        <About onContact={openContact} />
        <Approach />
        <ContactSection onContact={openContact} />
      </main>
      <Footer />
      {project && (
        <ProjectModal
          key={project.id}
          project={project}
          onClose={() => selectProject(null)}
        />
      )}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}
