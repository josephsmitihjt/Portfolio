import { imageUrl } from "../assets";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  LockKeyhole,
  Trophy,
} from "lucide-react";
import { projects, site, type Project } from "../content";
import { Modal, Reveal } from "./shared";

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

export function Work({ onSelect }: { onSelect: (project: Project) => void }) {
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
            <span className="section-side-note">
              STRATEGY IN THE THINKING. CRAFT IN THE DETAILS.
            </span>
          </div>
          <div className="section-heading">
            <h2 id="work-title">
              Built for people.
              <br />
              <span>Designed for impact.</span>
            </h2>
            <p>
              From complex security ecosystems
              <br />
              to the everyday shopping experience.
            </p>
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
              <button
                className={`project-card card-${project.id}`}
                onClick={() => onSelect(project)}
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
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [view, setView] = useState("Overview");
  const [copyState, setCopyState] = useState("idle");
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }
  return (
    <Modal
      title={`${project.name} case study`}
      onClose={onClose}
      className="project-modal"
    >
      <div className="case-study-header">
        <span className="eyebrow">
          {project.company.toUpperCase()} / {project.category.toUpperCase()}
        </span>
        <h2>{project.name}</h2>
        <p>{project.title}</p>
        <div className="case-study-facts">
          <div>
            <span>ROLE</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span>DURATION</span>
            <strong>{project.duration}</strong>
          </div>
          {project.nda && (
            <span className="nda-notice">
              <LockKeyhole size={12} /> Public information only · NDA applies
            </span>
          )}
        </div>
      </div>
      <ProjectImage project={project} />
      <div className="case-study-content">
        <div
          className="case-study-tabs"
          role="group"
          aria-label="Case study view"
        >
          {["Overview", "Design decisions", "Outcomes"].map((label) => (
            <button
              key={label}
              aria-pressed={view === label}
              className={view === label ? "selected" : ""}
              onClick={() => setView(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="case-study-panel" key={view}>
          {view === "Overview" ? (
            <>
              <h3>My role</h3>
              <p>{project.overview}</p>
              <h3>The challenge</h3>
              <p>{project.challenge}</p>
              <h3>The approach</h3>
              <p>{project.approach}</p>
            </>
          ) : view === "Design decisions" ? (
            <>
              <div className="decision-list">
                {project.decisions.map((decision, index) => (
                  <div key={decision.title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{decision.title}</h3>
                      <p>{decision.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {project.gallery?.map((image) => (
                <figure className="case-study-gallery" key={image.src}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </>
          ) : (
            <>
              <h3>The impact</h3>
              <div className="outcomes-grid">
                {project.outcomes.map((outcome) => (
                  <div key={outcome.label}>
                    <strong>{outcome.value}</strong>
                    <span>{outcome.label}</span>
                  </div>
                ))}
              </div>
              {project.award && (
                <div className="case-study-award">
                  <Trophy size={19} />
                  <span>{project.award}</span>
                </div>
              )}
              <p className="outcome-note">{project.outcomeNote}</p>
            </>
          )}
        </div>
        <div className="case-study-actions">
          <a
            className="text-button"
            href={`${site.referenceUrl}${project.sourcePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the original case study <ArrowUpRight size={16} />
          </a>
          <button className="share-button" onClick={copyLink}>
            {copyState === "copied" ? <Check size={14} /> : <Copy size={14} />}
            {copyState === "copied" ? "Link copied" : "Copy case-study link"}
          </button>
        </div>
        <p className="copy-feedback" role="status">
          {copyState === "copied"
            ? "Case-study link copied to clipboard."
            : copyState === "error"
              ? "Clipboard unavailable. Copy the URL from your address bar."
              : ""}
        </p>
        <button className="text-button case-study-back" onClick={onClose}>
          Back to projects <ArrowRight size={16} />
        </button>
      </div>
    </Modal>
  );
}
