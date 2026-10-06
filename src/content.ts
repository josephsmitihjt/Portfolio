export const site = {
  name: "Joseph Smith",
  initials: "JS",
  role: "Senior Product Designer",
  location: "Austin, Texas",
  email: "",
  referenceUrl: "https://jtsmith.design/",
  linkedIn: "https://www.linkedin.com/in/joseph-smith-04a292127/",
  resume:
    "https://drive.google.com/file/d/1fNQyYcUlHL-aJLsOUf1Bw7jJaR7gfR31/view?usp=sharing",
};
export type ProjectCategory = "Product design" | "Design systems" | "Strategy";
export type Project = {
  id: string;
  name: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  imageAlt: string;
  company: string;
  role: string;
  duration: string;
  sourcePath: string;
  overview: string;
  challenge: string;
  approach: string;
  decisions: { title: string; description: string }[];
  outcomes: { value: string; label: string }[];
  outcomeNote: string;
  award?: string;
  nda?: boolean;
  gallery?: { src: string; alt: string; caption: string }[];
};
// Adapted from the designer’s published portfolio, with original imagery. No invented client work.
export const projects: Project[] = [
  {
    id: "kwikkart",
    name: "KwikKart",
    title: "Bringing the digital experience into the aisle.",
    description:
      "One lightweight device. A connected ecosystem for frictionless shopping, store intelligence, and in-aisle retail media.",
    category: "Product design",
    tags: ["Product leadership", "Hardware + software", "Retail"],
    image: "/images/kwikkart.webp",
    imageAlt: "KwikKart smart checkout device mounted on a shopping cart",
    company: "KwikKart",
    role: "Co-founder & Chief Product Officer",
    duration: "2024 — present",
    sourcePath: "kwikkart-project",
    nda: true,
    overview:
      "As CPO, I lead product vision and execution, shaping both the product and the business behind it. My work connects business modeling, product roadmaps, design foundations, cross-functional delivery, and strategic partnerships.",
    challenge:
      "Grocery retail relies on legacy infrastructure. Retailers and consumer brands lack real-time in-store analytics, while shoppers navigate disconnected checkout, promotion, and discovery experiences. Replacing entire shopping carts introduces significant cost and operational complexity.",
    approach:
      "Connect retail media, store intelligence, and consumer analytics through a single device that installs on existing carts. Define the business model and expansion pillars, then guide the product from minimum viable experience to MVP.",
    decisions: [
      {
        title: "An ecosystem, rather than another tool",
        description:
          "Bring shopper engagement, shelf intelligence, and retail media into one closed-loop platform instead of asking retailers to stitch together disconnected systems.",
      },
      {
        title: "Work with existing infrastructure",
        description:
          "A lightweight device mounts to existing shopping carts, supporting a more scalable path than full cart replacement.",
      },
      {
        title: "Connect strategy to delivery",
        description:
          "Align product roadmaps, hardware development, branding, design systems, and partnerships around a shared product vision.",
      },
    ],
    outcomes: [
      { value: "8", label: "Business-model verticals" },
      { value: "1", label: "Connected retail platform" },
      { value: "End to end", label: "Vision through execution" },
    ],
    outcomeNote:
      "Work is ongoing. This summary includes only publicly shared information; NDA restrictions apply.",
  },
  {
    id: "soar",
    name: "QRadar SOAR Playbooks",
    title: "Less complexity. Faster security response.",
    description:
      "Re-architecting security workflows so analysts can build powerful playbooks with less friction and less code.",
    category: "Product design",
    tags: ["Enterprise UX", "Low-code / no-code", "Cybersecurity"],
    image: "/images/soar-playbooks.webp",
    imageAlt: "Laptop displaying the IBM QRadar SOAR playbook designer",
    company: "IBM",
    role: "UX Designer & Strategist",
    duration: "1+ years",
    sourcePath: "soar-playbooks-project",
    award: "Red Dot 2022 · iF Design 2023 · IDA Bronze 2022",
    overview:
      "I led the re-architecture of the application to improve how SOC analysts design and execute security defense workflows. I partnered with stakeholders to define product direction, identify experience gaps, and support team growth through onboarding and mentoring.",
    challenge:
      "Playbook creation was tedious and fragmented. Administrators lacked an end-to-end view, while building effective playbooks often required Python knowledge and memorizing the underlying architecture.",
    approach:
      "Restructure navigation into a scalable, sectioned toolbar and introduce a Playbook Data Navigator. Make the appropriate data and code available in context so non-technical security analysts can build automated response workflows.",
    decisions: [
      {
        title: "A toolbar that can grow",
        description:
          "Drawing on tools such as Photoshop and Blender, organize functionality into clear sections so analysts can find what they need as the application expands.",
      },
      {
        title: "Expertise over syntax",
        description:
          "Expose relevant code and data through the Data Navigator, shifting the focus from memorizing Python to applying security knowledge.",
      },
      {
        title: "Align the whole team",
        description:
          "Work with stakeholders to close platform gaps while mentoring and onboarding team members to sustain consistent execution.",
      },
    ],
    outcomes: [
      { value: "60×", label: "Faster playbook creation" },
      { value: "79%", label: "Less time on playbook-based schemas" },
      { value: "33%", label: "Less time on custom schemas" },
    ],
    outcomeNote:
      "Results reported in the original case study: playbook creation decreased from 60 hours to 1 hour. These are published project outcomes, not independently audited measurements.",
    gallery: [
      {
        src: "/images/soar-detail.webp",
        alt: "Published QRadar SOAR design detail",
        caption: "A closer look at the published SOAR workflow design.",
      },
    ],
  },
  {
    id: "ueba",
    name: "User & Entity Behavior Analytics",
    title: "Make the threat visible. Make the next step clear.",
    description:
      "A research-led security experience that gives analysts the context to understand anomalies and take informed action.",
    category: "Product design",
    tags: ["UX research", "Systems thinking", "Cybersecurity"],
    image: "/images/ueba.webp",
    imageAlt: "IBM User and Entity Behavior Analytics interface",
    company: "IBM",
    role: "Lead UX Strategist & Designer",
    duration: "8+ months",
    sourcePath: "ueba-project",
    overview:
      "I led a forward-facing UEBA initiative, defining a scalable and user-centered approach to threat detection for SOC analysts. Market research, cross-functional alignment, and iterative testing informed a product strategy focused on transparent, actionable context.",
    challenge:
      "The existing User Behavior Analytics experience faced performance issues, complex configuration, and limited entity analytics. Analysts needed to understand abnormal activity across people and devices without losing the broader context of a threat.",
    approach:
      "Audit the current experience and competitor solutions, establish jobs to be done, and run generative research with seven participants. Follow rapid concepting and mid-fidelity design with a second research round involving eight analysts and engineers.",
    decisions: [
      {
        title: "No black boxes: show the why",
        description:
          "Research pointed to a need for transparency. The design makes the reasoning and context behind an anomaly visible instead of presenting an unexplained score.",
      },
      {
        title: "A connected, single-pane experience",
        description:
          "Bring profiles, timelines, and relevant context together while letting analysts progressively explore deeper detail.",
      },
      {
        title: "From detection to understanding",
        description:
          "The anomaly canvas connects relevant nodes into a visual threat narrative, helping analysts construct and investigate a case.",
      },
    ],
    outcomes: [
      { value: "7", label: "Discovery research participants" },
      { value: "8", label: "Second-round research participants" },
      { value: "2", label: "Rounds of in-depth user research" },
    ],
    outcomeNote:
      "Research participant counts and the design approach come from the published case study. The final experience is described there as a concept.",
    gallery: [
      {
        src: "/images/ueba-detail.webp",
        alt: "Published UEBA concept showing the analyst investigation experience",
        caption: "The published UEBA investigation concept.",
      },
    ],
  },
  {
    id: "libraries",
    name: "Figma Initiative & Design Libraries",
    title: "A shared foundation for better design.",
    description:
      "Scaling component libraries, improving design workflows, and helping designers build with confidence.",
    category: "Design systems",
    tags: ["Design systems", "Component architecture", "Mentorship"],
    image: "/images/library-components.webp",
    imageAlt:
      "Carbon Design System data table, item, and base component architecture in Figma",
    company: "IBM",
    role: "Designer & Lead",
    duration: "1+ years",
    sourcePath: "figma-initiative",
    award: "Carbon Design System · Red Dot 2022",
    overview:
      "As a member of the IBM Figma board, I helped advance design processes and scale shared design systems. I developed low-, mid-, and high-fidelity libraries, focusing on reusable components, structured layering, and workflows that support the full product lifecycle.",
    challenge:
      "Designers needed consistent, adaptable foundations across products and fidelity levels. A growing library also needed clear architecture and practical guidance to avoid duplication and make components easier to maintain.",
    approach:
      "Build an organized component architecture, refine application libraries, and coach designers and developers through the reasoning behind the system. Encourage independent problem-solving while supplying a shared framework.",
    decisions: [
      {
        title: "Structure at every layer",
        description:
          "Establish a tiered approach to component architecture so foundations, parts, and final components can evolve coherently.",
      },
      {
        title: "Support the whole design process",
        description:
          "Develop low- and mid-fidelity organizational libraries alongside application-based libraries for later-stage design.",
      },
      {
        title: "Build capability, not dependency",
        description:
          "Mentor designers through the limitations and possibilities of Figma, encouraging critical thinking and independent component development.",
      },
    ],
    outcomes: [
      { value: "3", label: "Fidelity levels supported" },
      { value: "v10 + v11", label: "Organized application libraries" },
      { value: "Shared", label: "Patterns, components, and guidance" },
    ],
    outcomeNote:
      "The source lists several efficiency figures without a common methodology. This summary focuses on documented deliverables rather than combining those percentages.",
    gallery: [
      {
        src: "/images/library-components.webp",
        alt: "Three layers of the Carbon data table: final table, items, and bases",
        caption:
          "Component layering: data table, reusable items, and foundational bases.",
      },
    ],
  },
  {
    id: "ngsiem",
    name: "QRadar Next-Generation SIEM",
    title: "Connecting the dots across an entire ecosystem.",
    description:
      "A unified security product strategy built around analyst journeys, cross-product workflows, and shared direction.",
    category: "Strategy",
    tags: ["UX strategy", "Jobs to be done", "Product ecosystem"],
    image: "/images/ngsiem.webp",
    imageAlt:
      "IBM QRadar next-generation security information and event management product visual",
    company: "IBM",
    role: "UX Strategist",
    duration: "1+ years",
    sourcePath: "qradar-ngsiem-project",
    overview:
      "I drove UX improvements by identifying gaps across the platform and aligning the experience around SOC analyst workflows. Collaborating with subject matter experts and cross-functional stakeholders helped translate user journeys into a connected product strategy.",
    challenge:
      "Individual SIEM applications worked for isolated use cases but lacked a unified ecosystem. Analysts had to move between siloed products, losing continuity and context in their workflows.",
    approach:
      "Lead primary and secondary research, synthesize findings through affinity mapping, and facilitate working sessions across the security division. Define personas, use cases, journeys, and jobs to be done to align stakeholders on the target experience.",
    decisions: [
      {
        title: "Follow the workflow across products",
        description:
          "Map analyst needs beyond individual application boundaries to uncover the missing connections between products.",
      },
      {
        title: "Build consensus from evidence",
        description:
          "Bring product managers, architects, development leads, and design leads into working sessions grounded in research and operational needs.",
      },
      {
        title: "Turn journeys into a roadmap",
        description:
          "Translate agreed opportunities and jobs to be done into a long-term design roadmap that teams can act on.",
      },
    ],
    outcomes: [
      { value: "5-year", label: "Company roadmap informed" },
      { value: "Connected", label: "Cross-product workflow strategy" },
      { value: "Aligned", label: "Security-division stakeholders" },
    ],
    outcomeNote:
      "The source describes a projected upsell opportunity, not realized revenue. This summary focuses on the delivered strategy work.",
  },
];
export const experience = [
  {
    role: "Chief Product Officer",
    company: "KwikKart",
    period: "2024 — present",
  },
  {
    role: "Product Designer / Strategist",
    company: "IBM",
    period: "2021 — 2026",
  },
  {
    role: "Product Strategist",
    company: "Freelance",
    period: "2019 — present",
  },
];
export const process = [
  {
    title: "Understand the real problem",
    label: "01 / DISCOVER",
    description:
      "Start with people, context, and the decisions that matter. Bring user needs and business goals into focus through research, journey mapping, and a clear problem statement.",
    tags: ["Research", "Problem framing", "Journey mapping"],
  },
  {
    title: "Make the complex feel simple",
    label: "02 / DEFINE & DESIGN",
    description:
      "Turn evidence into a clear structure. Explore multiple directions, make tradeoffs explicit, and use prototypes to align the team around the right experience.",
    tags: ["Systems thinking", "Prototyping", "Interaction design"],
  },
  {
    title: "Learn, refine, and move forward",
    label: "03 / VALIDATE & DELIVER",
    description:
      "Test the important assumptions, partner with engineering, and care about the details. Keep learning after delivery and use evidence to shape the next iteration.",
    tags: ["Usability testing", "Design systems", "Collaboration"],
  },
];
