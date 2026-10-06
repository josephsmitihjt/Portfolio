import { projectUrl } from "../routes";
import { imageUrl } from "../assets";
import { useState } from "react";
import { ArrowUpRight, LockKeyhole, Trophy } from "lucide-react";
import { projects, type Project } from "../content";
import { Reveal } from "./shared";

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.id}`}>
      <div className="visual-grid" />
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        width="900"
        height="680"
      />
      {project.id === "libraries" && (
        <img
          className="figma-logo"
          src={imageUrl("figma.webp")}
          alt="Figma"
          loading="lazy"
          width="474"
          height="208"
        />
      )}
      <span className="visual-label">
        {project.company.toUpperCase()} / {project.category.toUpperCase()}
      </span>
    </div>
  );
}

export function Work() {
  const [filter, setFilter] = useState("All projects");
  const visibleProjects = projects.filter(
    (project) => filter === "All projects" || project.category === filter,
  );
  return (
    <section
      className="work-section section"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container">
        <Reveal>
          <div className="section-topline">
            <span className="eyebrow">
              <span className="section-number">01</span> SELECTED PROJECTS
            </span>
          </div>
          <div className="section-heading">
            <h2 id="work-title">
              Built for people.
              <br />
              <span>Designed for impact.</span>
            </h2>
          </div>
        </Reveal>
        <div className="work-toolbar">
          <div className="filters" role="group" aria-label="Filter projects">
            {[
              "All projects",
              "Product design",
              "Design systems",
              "Strategy",
            ].map((label) => (
              <button
                key={label}
                aria-pressed={filter === label}
                onClick={() => setFilter(label)}
                className={filter === label ? "selected" : ""}
              >
                {label}
                <span>
                  {label === "All projects"
                    ? projects.length
                    : projects.filter((project) => project.category === label)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <span className="work-caption">
            {String(visibleProjects.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
        <p className="sr-only" aria-live="polite">
          {visibleProjects.length} projects shown
        </p>
        <div className="project-list" key={filter}>
          {visibleProjects.map((project) => (
            <Reveal key={project.id} className="project-reveal">
              <a
                className={`project-card card-${project.id}`}
                href={projectUrl(project)}
                aria-label={`View ${project.name} case study`}
              >
                <div className="project-copy">
                  <div className="project-meta">
                    <span className="project-number">
                      0{projects.indexOf(project) + 1}
                    </span>
                    <span>
                      {project.company} / {project.category}
                    </span>
                    {project.nda && (
                      <span className="nda-tag">
                        <LockKeyhole size={11} /> NDA
                      </span>
                    )}
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-title">{project.title}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.award && (
                    <div className="project-award">
                      <Trophy size={12} />
                      {project.award}
                    </div>
                  )}
                  <span className="project-read">
                    View case study <ArrowUpRight size={17} />
                  </span>
                </div>
                <ProjectImage project={project} />
                <span className="project-visit">
                  <ArrowUpRight size={24} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
