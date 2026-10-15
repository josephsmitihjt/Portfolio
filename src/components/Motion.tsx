import { useEffect, type CSSProperties, type ReactNode } from "react";

/** Real text nodes preserve the heading's accessible name and text selection. */
export function AnimatedText({
  text,
  offset = 0,
  suffix,
}: {
  text: string;
  offset?: number;
  suffix?: ReactNode;
}) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="motion-word"
          style={
            { "--word-delay": `${offset + index * 65}ms` } as CSSProperties
          }
        >
          {word}
          {index === text.split(" ").length - 1 && suffix}
          {index < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </>
  );
}

/** One-time introductions; native scrolling and browser history remain intact. */
export function MotionExperience() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const headings = Array.from(document.querySelectorAll("main h2"));
    let observer: IntersectionObserver | undefined;
    function configure() {
      observer?.disconnect();
      if (preference.matches) {
        headings.forEach((heading) =>
          heading.classList.remove("motion-intro", "intro-entered"),
        );
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("intro-entered");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 },
      );
      headings.forEach((heading) => {
        heading.classList.add("motion-intro");
        observer?.observe(heading);
      });
    }
    configure();
    preference.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      headings.forEach((heading) =>
        heading.classList.remove("motion-intro", "intro-entered"),
      );
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
