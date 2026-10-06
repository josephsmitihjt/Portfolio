import { imageUrl } from "../assets";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <>
      <section
        className="hero container"
        id="home"
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <div className="eyebrow hero-intro">
            <span className="status-dot" /> SENIOR PRODUCT DESIGNER{" "}
            <span className="intro-line" />
          </div>
          <h1 id="hero-title">
            Complex
            <br />
            problems.
            <br />
            <span>Clear</span>
            <br />
            experiences<span className="hero-period">.</span>
          </h1>
          <p className="hero-description">
            I’m Joseph Smith. I connect people, strategy, and technology to
            design products that move businesses forward.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work <ArrowDownRight size={19} />
            </a>
            <a className="hero-about-link" href="#about">
              A little about me <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-footnote">
            7+ YEARS OF EXPERIENCE <span> / </span> AUSTIN, TEXAS
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-orbit" />
          <img
            src={imageUrl("joseph-smith.webp")}
            alt="Joseph Smith in profile"
            width="1400"
            height="933"
            fetchPriority="high"
          />
          <span className="portrait-coordinate">30.2672° N / 97.7431° W</span>
        </div>
      </section>
      <section className="recognition" aria-label="Design recognition">
        <div className="container recognition-inner">
          <span className="recognition-label">RECOGNIZED WORK</span>
          <span>
            red<span className="award-red">dot</span> <small>2× WINNER</small>
          </span>
          <i />
          <span className="if-award">
            iF <small>2× DESIGN AWARD</small>
          </span>
          <i />
          <span>
            IDA <small>2× DESIGN AWARD</small>
          </span>
          <i />
          <span>
            IBM <small>DESIGNER AWARD</small>
          </span>
          <ArrowUpRight size={20} />
        </div>
      </section>
    </>
  );
}
