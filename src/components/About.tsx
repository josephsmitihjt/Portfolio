import { ArrowUpRight, Asterisk, Check } from "lucide-react";
import { experience, site } from "../content";
import { Reveal } from "./shared";

export function About({ onContact }: { onContact: () => void }) {
  return (
    <section
      className="about-section section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="container">
        <Reveal>
          <div className="section-topline">
            <span className="eyebrow">
              <span className="section-number">02</span> BEHIND THE WORK
            </span>
            <Asterisk className="about-star" size={38} />
          </div>
          <div className="about-grid">
            <div className="about-title">
              <h2 id="about-title">
                A strategist’s
                <br />
                perspective.
                <br />A designer’s
                <br />
                <span>attention to detail.</span>
              </h2>
              <div className="about-location">
                <span className="status-dot" /> BASED IN{" "}
                {site.location.toUpperCase()}
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                Great products begin with understanding people.
              </p>
              <p>
                I’m Joseph, a product designer and strategist with over seven
                years of experience spanning startups and enterprise
                organizations. I lead initiatives from concept through
                execution, bridging strategy, design, and delivery.
              </p>
              <p>
                My work balances user needs with business goals. Whether I’m
                building a retail platform at KwikKart or connecting security
                experiences at IBM, I look for the bigger picture—and care about
                the smallest details.
              </p>
              <p>
                Outside of work, you’ll find me backpacking, playing lacrosse,
                or spending time on the water. A fresh perspective is rarely far
                away.
              </p>
              <div className="about-principles">
                <span>
                  <Check size={13} /> Systems thinking
                </span>
                <span>
                  <Check size={13} /> Product leadership
                </span>
                <span>
                  <Check size={13} /> Mentorship
                </span>
              </div>
              <button className="text-button" onClick={onContact}>
                Let’s make something meaningful <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="experience-list">
            <span className="eyebrow">WHERE I’VE MADE AN IMPACT</span>
            {experience.map((job) => (
              <div className="experience-row" key={job.company}>
                <span>{job.company}</span>
                <strong>{job.role}</strong>
                <span>{job.period}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
