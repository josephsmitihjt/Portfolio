import { Asterisk } from "lucide-react";
import { experience, site } from "../content";
import { Reveal } from "./shared";

export function About() {
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
                About me<span>.</span>
              </h2>
              <div className="about-location">
                <span className="status-dot" /> BASED IN{" "}
                {site.location.toUpperCase()}
              </div>
              <div className="about-skills">
                <h3>What I bring</h3>
                <ul aria-label="Skills">
                  {[
                    "Product Design",
                    "Systems Thinking",
                    "Logical / Technical Thinker",
                    "Growth Mindset",
                    "Leadership",
                    "Soft Skills",
                    "Coaching",
                    "Project Management",
                  ].map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="about-copy">
              <p>
                Located in Austin, Texas, I specializing in business strategy
                and building products that help organizations outperform their
                competition. With over seven years of experience spanning
                startups and enterprise organizations, I have led initiatives
                from concept through execution, bridging strategy, design, and
                delivery.
              </p>
              <p>
                Great products begin with understanding people. I immerse myself
                in the needs of users, balancing their goals with business
                objectives to create experiences that drive real impact.
              </p>
              <p>
                I naturally have a growth mindset and enjoy tackling ambitious
                challenges. Once I commit to a goal, I’m relentless in learning,
                iterating, and becoming an expert.
              </p>
              <p>
                Beyond work, I’m passionate about exploring emerging
                technologies, mentoring designers, and contributing to the
                design community. Outside of work, I recharge by backpacking,
                playing lacrosse, and spending time outdoors returning with a
                fresh perspective and renewed energy.
              </p>
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
