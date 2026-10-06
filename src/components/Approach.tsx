import { useState } from "react";
import { Asterisk, Plus } from "lucide-react";
import { process } from "../content";
import { Reveal } from "./shared";

export function Approach() {
  const [expanded, setExpanded] = useState<number | null>(0);
  return (
    <section
      className="approach-section section container"
      id="approach"
      aria-labelledby="approach-title"
    >
      <Reveal>
        <div className="section-topline">
          <span className="eyebrow">
            <span className="section-number">03</span> HOW I THINK
          </span>
        </div>
        <div className="approach-grid">
          <div className="approach-intro">
            <h2 id="approach-title">
              Thoughtful by
              <br />
              design. Better
              <br />
              <span>together.</span>
            </h2>
            <p>
              A clear point of view. An open mind.
              <br />A process shaped by the problem.
            </p>
            <div className="approach-graphic" aria-hidden="true">
              <div />
              <div />
              <div />
              <span>
                <Asterisk size={30} />
              </span>
            </div>
          </div>
          <div className="process-list">
            {process.map((step, index) => (
              <div
                className={`process-item ${expanded === index ? "is-expanded" : ""}`}
                key={step.title}
              >
                <h3>
                  <button
                    aria-expanded={expanded === index}
                    aria-controls={`process-content-${index}`}
                    id={`process-trigger-${index}`}
                    onClick={() =>
                      setExpanded(expanded === index ? null : index)
                    }
                  >
                    <span>
                      <span className="process-label">{step.label}</span>
                      {step.title}
                    </span>
                    <span className="process-toggle">
                      <Plus size={20} />
                    </span>
                  </button>
                </h3>
                <div
                  className="process-content"
                  id={`process-content-${index}`}
                  role="region"
                  aria-labelledby={`process-trigger-${index}`}
                  hidden={expanded !== index}
                >
                  <p>{step.description}</p>
                  <div className="process-tags">
                    {step.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
