import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  Copy,
  Layers3,
  LockKeyhole,
  Play,
  Trophy,
} from "lucide-react";
import {
  caseStudies,
  type StudyImage,
  type StudySection,
} from "../caseStudies";
import { projects, site, type Project } from "../content";
import { homeUrl, projectUrl } from "../routes";
import { Reveal } from "./shared";
import { imageUrl } from "../assets";

function StudyFigure({
  image,
  className = "",
}: {
  image: StudyImage;
  className?: string;
}) {
  return (
    <figure
      className={`study-figure ${className} ${image.tone ? `figure-${image.tone}` : ""}`}
    >
      <div className="study-figure-image">
        <img src={image.src} alt={image.alt} loading="lazy" />
      </div>
      <figcaption>
        <span>{image.caption}</span>
        <a
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full-size image: ${image.caption}`}
        >
          Full size <ArrowUpRight size={13} />
        </a>
      </figcaption>
    </figure>
  );
}

function ToolbarComparison({ images }: { images: StudyImage[] }) {
  const [selected, setSelected] = useState(1);
  return (
    <div className="toolbar-comparison">
      <div className="comparison-top">
        <span className="eyebrow">THE TOOLBAR, RECONSIDERED</span>
        <div
          className="comparison-controls"
          role="group"
          aria-label="Compare toolbar designs"
        >
          {["Before", "After"].map((label, index) => (
            <button
              key={label}
              aria-pressed={selected === index}
              className={selected === index ? "selected" : ""}
              onClick={() => setSelected(index)}
            >
              {label}
              {index === 1 && <Check size={13} />}
            </button>
          ))}
        </div>
      </div>
      <div className="comparison-image" key={selected}>
        <img
          src={images[selected].src}
          alt={images[selected].alt}
          loading="lazy"
        />
        <span>
          {selected === 0
            ? "Original: functionality concentrated in one row"
            : "Redesigned: functionality organized into clearer sections"}
        </span>
      </div>
      <div className="comparison-bottom">
        <p>{images[selected].caption}</p>
        <a
          className="text-button"
          href={images[selected].src}
          target="_blank"
          rel="noopener noreferrer"
        >
          Inspect the toolbar <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="sr-only" role="status">
        {selected === 0 ? "Before toolbar shown" : "After toolbar shown"}
      </div>
    </div>
  );
}

function ComponentArchitecture() {
  const [layer, setLayer] = useState(0);
  const layers = [
    {
      name: "Bases",
      description:
        "Foundational parts establish a stable starting point for the system.",
      detail: "FOUNDATIONAL BUILDING BLOCKS",
    },
    {
      name: "Items",
      description:
        "Reusable items combine foundations into the parts of a data table.",
      detail: "COMPOSABLE TABLE ELEMENTS",
    },
    {
      name: "Final component",
      description:
        "The final table composes the shared parts into a consistent, adaptable pattern.",
      detail: "A COHERENT PRODUCT PATTERN",
    },
  ];
  return (
    <div className="architecture-explorer">
      <div className="architecture-heading">
        <Layers3 size={22} />
        <span className="eyebrow">A THREE-TIER APPROACH</span>
      </div>
      <div
        className="architecture-layers"
        role="group"
        aria-label="Explore component layers"
      >
        {layers.map((item, index) => (
          <button
            key={item.name}
            aria-pressed={layer === index}
            className={layer === index ? "selected" : ""}
            onClick={() => setLayer(index)}
          >
            <span>0{index + 1}</span>
            <strong>{item.name}</strong>
            <ArrowRight size={17} />
          </button>
        ))}
      </div>
      <div className="architecture-detail" key={layer}>
        <span className="eyebrow">{layers[layer].detail}</span>
        <p>{layers[layer].description}</p>
      </div>
    </div>
  );
}

function StorySection({
  section,
  index,
  prototype = false,
}: {
  section: StudySection;
  index: number;
  prototype?: boolean;
}) {
  const images = section.images ?? [];
  return (
    <section
      className={`study-chapter chapter-${section.kind || "narrative"}`}
      id={section.id}
      aria-labelledby={`${section.id}-title`}
    >
      <Reveal>
        <div className="study-chapter-heading">
          <span className="chapter-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <span className="eyebrow">{section.label}</span>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
          </div>
        </div>
        <div className="study-chapter-copy">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {section.metrics && (
          <div className="research-metrics">
            {section.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        )}
        {section.cards && (
          <div
            className={`study-cards ${section.kind === "flow" ? "flow-cards" : ""}`}
          >
            {section.cards.map((card, index) => (
              <article key={card.title}>
                <span className="card-index">
                  {card.label || `0${index + 1}`}
                </span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {section.kind === "flow" && (
                  <ArrowUpRight size={21} className="flow-arrow" />
                )}
              </article>
            ))}
          </div>
        )}
        {section.kind === "architecture" && <ComponentArchitecture />}
        {section.kind === "comparison" ? (
          <>
            <ToolbarComparison images={images} />
            {images[2] && (
              <StudyFigure image={images[2]} className="figure-toolbar" />
            )}
          </>
        ) : (
          images.length > 0 && (
            <div
              className={`study-gallery ${images.length > 1 && section.id !== "jobs" ? "gallery-pair" : ""}`}
            >
              {images.map((image) => (
                <StudyFigure key={image.src} image={image} />
              ))}
            </div>
          )
        )}
        {prototype && (
          <figure className="study-prototype" aria-labelledby="prototype-title">
            <span className="eyebrow">THE PROTOTYPE / 01:17</span>
            <h3 id="prototype-title">See the investigation take shape.</h3>
            <video
              controls
              playsInline
              preload="none"
              poster={imageUrl("case-studies/ueba-prototype-poster.webp")}
              aria-label="UEBA prototype walkthrough"
              aria-describedby="prototype-description"
            >
              <source
                src={`${import.meta.env.BASE_URL}videos/ueba-prototype.mp4`}
                type="video/mp4"
              />
              Your browser does not support video playback.{" "}
              <a href={`${import.meta.env.BASE_URL}videos/ueba-prototype.mp4`}>
                Download the prototype recording.
              </a>
            </video>
            <figcaption id="prototype-description">
              A silent walkthrough of the UEBA anomaly canvas: explore connected
              events, query related entities, and add evidence to an
              investigation.
            </figcaption>
            <details className="prototype-transcript">
              <summary>Read the walkthrough description</summary>
              <p>
                The recording starts on John Doe’s anomaly canvas in IBM QRadar
                Suite. Connected events include suspicious email, a risky URL,
                compromised credentials, an unknown device, an abnormal login
                location, and data exfiltration. Each event displays a risk
                score and confidence level.
              </p>
              <p>
                The analyst opens Add data and the “Build a search on related
                entities” panel. They select user data, set a time window and
                time zone, choose related entity types, and configure risk and
                confidence thresholds. They run the query, then review the query
                summary and grouped results.
              </p>
              <p>
                The analyst expands an Apache web server result and adds it to
                the canvas. The panel closes, and the new evidence appears as a
                connected node with its own risk score and confidence level. The
                recording demonstrates a design prototype, rather than a live
                production investigation.
              </p>
            </details>
          </figure>
        )}
        {section.quote && (
          <blockquote className="study-quote">
            <span aria-hidden="true">“</span>
            <p>{section.quote.text}</p>
            <cite>{section.quote.attribution}</cite>
          </blockquote>
        )}
        {section.link && (
          <a
            className="study-external-link"
            href={section.link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {section.link.label.includes("demo") ? (
              <Play size={17} />
            ) : (
              <Trophy size={17} />
            )}
            <span>{section.link.label}</span>
            <ArrowUpRight size={18} />
          </a>
        )}
      </Reveal>
    </section>
  );
}

function StudyNavigation({ sections }: { sections: StudySection[] }) {
  const [active, setActive] = useState("overview");
  const items = [
    { id: "overview", label: "Overview" },
    { id: "challenge", label: "The challenge" },
    ...sections.map((section, index) => ({
      id: section.id,
      label: `${String(index + 1).padStart(2, "0")} / ${section.label.split(" / ")[1]}`,
    })),
    { id: "outcomes", label: "Impact" },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-20% 0px -65% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);
  return (
    <nav className="study-navigation" aria-label="Case study sections">
      <div className="container study-navigation-inner">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? "active" : ""}
            aria-current={active === item.id ? "location" : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const study = caseStudies[project.id];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }
  return (
    <article className={`study-page study-${project.id}`}>
      <header className="study-hero container" id="study-top">
        <div className="study-breadcrumb">
          <a href={homeUrl("work")}>
            <ArrowLeft size={14} /> All projects
          </a>
          <span>CASE STUDY / 0{projects.indexOf(project) + 1}</span>
          <button className="study-share" onClick={copyLink}>
            {copyState === "copied" ? <Check size={14} /> : <Copy size={14} />}
            {copyState === "copied" ? "Copied" : "Copy link"}
          </button>
        </div>
        <p className="study-share-feedback sr-only" role="status">
          {copyState === "copied"
            ? "Case-study link copied to clipboard."
            : copyState === "error"
              ? "Clipboard unavailable. Copy the page URL from your address bar."
              : ""}
        </p>
        <div className="study-hero-grid">
          <div className="study-hero-copy">
            <span className="eyebrow">
              <span className="study-dot" />
              {study.chapter}
            </span>
            <h1>
              {project.name}
              <span className="study-period">.</span>
            </h1>
            <p className="study-deck">{study.headline}</p>
            <p className="study-summary">{study.summary}</p>
            {project.nda && (
              <span className="study-nda">
                <LockKeyhole size={13} /> Public case study · NDA applies
              </span>
            )}
            {project.award && (
              <span className="study-award">
                <Trophy size={14} />
                {project.award}
              </span>
            )}
            <a className="study-explore" href="#overview">
              Explore the story <ArrowDown size={17} />
            </a>
          </div>
          <div className={`study-hero-art hero-art-${project.id}`}>
            <div className="study-art-orbit" />
            <span className="study-art-company">
              {project.company.toUpperCase()}
              <Asterisk size={23} />
            </span>
            <img
              src={
                project.id === "libraries"
                  ? imageUrl("case-studies/libraries-carbon.webp")
                  : project.image
              }
              alt={
                project.id === "libraries"
                  ? "Carbon Design System interface components"
                  : project.imageAlt
              }
              width="1000"
              height="800"
              fetchPriority="high"
            />
            <span className="study-art-caption">
              {project.category.toUpperCase()} / JOSEPH SMITH
            </span>
          </div>
        </div>
        <dl className="study-facts">
          <div>
            <dt>COMPANY</dt>
            <dd>{project.company}</dd>
          </div>
          <div>
            <dt>MY ROLE</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>DURATION</dt>
            <dd>{project.duration}</dd>
          </div>
          <div>
            <dt>FOCUS</dt>
            <dd>{project.tags.slice(0, 2).join(" · ")}</dd>
          </div>
        </dl>
      </header>
      <StudyNavigation sections={study.sections} />
      <div className="container study-content">
        <section
          className="study-overview"
          id="overview"
          aria-labelledby="study-overview-title"
        >
          <Reveal>
            <div className="study-overview-grid">
              <div>
                <span className="eyebrow">THE OVERVIEW</span>
                <h2 id="study-overview-title">
                  The bigger picture.
                  <br />
                  <span>My part in it.</span>
                </h2>
              </div>
              <div>
                <p className="study-intro">{project.overview}</p>
                <p>{project.approach}</p>
              </div>
            </div>
          </Reveal>
        </section>
        <section
          className="study-challenge"
          id="challenge"
          aria-labelledby="study-challenge-title"
        >
          <Reveal>
            <span className="eyebrow">THE CHALLENGE</span>
            <h2 id="study-challenge-title">{study.challengeTitle}</h2>
            <p className="challenge-lead">{project.challenge}</p>
            <ul className="challenge-points">
              {study.challengePoints.map((point, index) => (
                <li key={point}>
                  <span>0{index + 1}</span>
                  {point}
                </li>
              ))}
            </ul>
            {study.contextMetrics && (
              <>
                <div className="context-metrics">
                  {study.contextMetrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <p className="context-note">{study.contextNote}</p>
              </>
            )}
          </Reveal>
        </section>
        {study.sections.map((section, index) => (
          <StorySection
            key={section.id}
            section={section}
            index={index}
            prototype={project.id === "ueba" && section.id === "concept"}
          />
        ))}
        <section
          className="study-impact"
          id="outcomes"
          aria-labelledby="study-impact-title"
        >
          <Reveal>
            <span className="eyebrow">THE IMPACT</span>
            <div className="study-impact-heading">
              <h2 id="study-impact-title">
                What the work
                <br />
                <span>made possible.</span>
              </h2>
              <Asterisk size={43} />
            </div>
            <div className="study-outcomes">
              {project.outcomes.map((outcome) => (
                <div key={outcome.label}>
                  <strong>{outcome.value}</strong>
                  <span>{outcome.label}</span>
                </div>
              ))}
            </div>
            <p className="study-outcome-note">{project.outcomeNote}</p>
            {project.award && (
              <div className="study-recognition">
                <Trophy size={20} />
                <span>{project.award}</span>
              </div>
            )}
            <div className="study-reflection">
              <span className="eyebrow">A FINAL THOUGHT</span>
              <p>{study.reflection}</p>
            </div>
            <a
              className="text-button study-source"
              href={`${site.referenceUrl}${project.sourcePath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Original case study <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </section>
      </div>
      <section className="next-project">
        <div className="container">
          <span className="eyebrow">KEEP EXPLORING / NEXT PROJECT</span>
          <a href={projectUrl(next)} className="next-project-link">
            <div>
              <h2>{next.name}</h2>
              <p>{next.title}</p>
            </div>
            <span className="next-project-arrow">
              <ArrowUpRight size={42} />
            </span>
          </a>
          <a href={homeUrl("work")} className="text-button">
            <ArrowLeft size={14} /> Back to all projects
          </a>
        </div>
      </section>
    </article>
  );
}
