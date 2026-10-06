import { imageUrl } from "./assets";

export type StudyImage = {
  src: string;
  alt: string;
  caption: string;
  tone?: "dark" | "light";
};
export type StudySection = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  kind?: "comparison" | "research" | "pillars" | "architecture" | "flow";
  images?: StudyImage[];
  cards?: { title: string; description: string; label?: string }[];
  metrics?: { value: string; label: string }[];
  quote?: { text: string; attribution: string };
  link?: { label: string; href: string };
};
export type CaseStudy = {
  chapter: string;
  headline: string;
  summary: string;
  challengeTitle: string;
  challengePoints: string[];
  contextMetrics?: { value: string; label: string }[];
  contextNote?: string;
  sections: StudySection[];
  reflection: string;
};
const img = (
  name: string,
  alt: string,
  caption: string,
  tone?: "dark" | "light",
): StudyImage => ({
  src: imageUrl(`case-studies/${name}.webp`),
  alt,
  caption,
  tone,
});

export const caseStudies: Record<string, CaseStudy> = {
  kwikkart: {
    chapter: "PRODUCT LEADERSHIP / CONNECTED RETAIL",
    headline: "One cart. A whole new retail experience.",
    summary:
      "Connecting the physical aisle to a digital ecosystem—through a device that works with the carts retailers already own.",
    challengeTitle: "The store is physical. The opportunity is digital.",
    challengePoints: [
      "Fragmented tools leave retailers without a complete picture of the store.",
      "In-aisle advertising lacks real-time shopper context and closed-loop measurement.",
      "Full smart-cart replacement is expensive and operationally difficult to scale.",
    ],
    contextMetrics: [
      { value: "87%", label: "Of grocery spending happens in stores" },
      { value: "2%", label: "Average grocery retailer margin" },
      { value: "<1%", label: "Of advertising reaches in-store shoppers" },
    ],
    contextNote:
      "Market context presented in the original KwikKart case study.",
    sections: [
      {
        id: "ecosystem",
        label: "01 / SYSTEMS THINKING",
        title: "Stop stitching tools together. Connect the ecosystem.",
        paragraphs: [
          "Store intelligence tools observe shelves. Smart carts engage shoppers. Retail media adds another disconnected surface. KwikKart brings these capabilities together in a lightweight, cart-mounted device.",
          "I shaped the product vision and foundational business model, defined expansion pillars, and aligned the roadmap and partnerships around a single platform.",
        ],
        kind: "flow",
        cards: [
          {
            title: "Shopper experience",
            description:
              "Personalized discovery, offers, recipes, navigation, and scan-as-you-shop.",
          },
          {
            title: "Store intelligence",
            description:
              "Shelf visibility, inventory signals, basket context, and operational insight.",
          },
          {
            title: "Retail media",
            description:
              "In-aisle engagement, targeted promotions, and closed-loop measurement.",
          },
        ],
        images: [
          img(
            "kwikkart-ecosystem",
            "KwikKart ecosystem illustration connecting shoppers, shelves, advertising, and analytics",
            "The public product vision: one device connecting the physical store.",
            "dark",
          ),
        ],
      },
      {
        id: "platform",
        label: "02 / THE PRODUCT",
        title: "A digital companion for the physical aisle.",
        paragraphs: [
          "The device installs on existing shopping carts. That approach lets the team combine shopper engagement with computer vision and store intelligence without asking retailers to replace their entire cart fleet.",
          "From MVE to MVP, my role connected hardware development, product design, delivery, and long-term ecosystem strategy.",
        ],
        images: [
          img(
            "kwikkart-platform",
            "KwikKart device with multiple digital shopping screens above it",
            "A shared hardware foundation for multiple retail experiences.",
          ),
        ],
        kind: "pillars",
        cards: [
          {
            label: "01",
            title: "Personalized shopping",
            description:
              "Recipes, coupons, product discovery, and recommendations at the point of decision.",
          },
          {
            label: "02",
            title: "Store visibility",
            description:
              "Passive computer vision helps surface availability, pricing, and merchandising signals.",
          },
          {
            label: "03",
            title: "In-aisle media",
            description:
              "Connect brand engagement with shopper behavior and meaningful measurement.",
          },
        ],
      },
      {
        id: "delivery",
        label: "03 / VISION TO EXECUTION",
        title: "Designing the product—and the business behind it.",
        paragraphs: [
          "As co-founder and CPO, I own the roadmap, guide cross-functional delivery, and build the partnerships needed to support long-term growth. The scope includes business modeling across eight verticals, design systems, branding, and product management.",
          "The work is ongoing. The screens and strategy shown here are the material already shared publicly; further details are covered by NDA.",
        ],
        images: [
          img(
            "kwikkart-operations",
            "Tablet displaying the public KwikKart operations interface",
            "Retail operations: translating store activity into a useful working view.",
          ),
          img(
            "kwikkart-analytics",
            "Desktop displaying the public KwikKart customer insights dashboard",
            "Customer insights: making collected signals useful to the business.",
          ),
        ],
      },
    ],
    reflection:
      "The opportunity is bigger than checkout. The product has to create value for shoppers, retailers, and brands—and the business model has to connect those needs as carefully as the interface does.",
  },
  soar: {
    chapter: "ENTERPRISE UX / SECURITY AUTOMATION",
    headline: "Security expertise. Fewer barriers to action.",
    summary:
      "Helping SOC analysts build automated defense workflows through clearer navigation and a low-code/no-code experience.",
    challengeTitle: "When every second counts, the tools should help you move.",
    challengePoints: [
      "Fragmented playbook creation makes the end-to-end workflow hard to understand.",
      "An overloaded toolbar limits discoverability and future scalability.",
      "Python knowledge and memorized schemas create a barrier for non-technical analysts.",
    ],
    sections: [
      {
        id: "navigation",
        label: "01 / NAVIGATION OPTIMIZATION",
        title: "More capability. Less toolbar complexity.",
        paragraphs: [
          "The original toolbar placed too much functionality in one space. As the product grew, that structure made actions harder to find and left little room for the next capability.",
          "Drawing inspiration from design tools such as Photoshop and Blender, I worked with the team lead to reorganize the toolbar into structured sections. Navigation, canvas actions, and execution could now have clearer homes.",
        ],
        kind: "comparison",
        images: [
          img(
            "soar-toolbar-before",
            "Original QRadar SOAR toolbar with functionality in one horizontal row",
            "Before: an overloaded toolbar.",
            "dark",
          ),
          img(
            "soar-toolbar-after",
            "Reorganized QRadar SOAR toolbar with clearer groups of actions",
            "After: a structured, scalable toolbar.",
            "dark",
          ),
          img(
            "soar-toolbar-zones",
            "Annotated SOAR toolbar identifying navigation, canvas actions, global actions, and execution sections",
            "The design rationale: give each kind of action a recognizable place.",
            "dark",
          ),
        ],
      },
      {
        id: "navigator",
        label: "02 / PLAYBOOK DATA NAVIGATOR",
        title: "Make security knowledge the prerequisite. Not Python.",
        paragraphs: [
          "Analysts previously needed to remember code sets and their playbook architecture to construct a schema. The Data Navigator brings the appropriate data and code into the workflow, reducing the need to memorize syntax.",
          "For custom schemas, the published case study reports a 33% reduction in creation time. For playbook-based schemas, it reports 79%. The change lets teams prioritize security expertise when staffing the work.",
        ],
        images: [
          img(
            "soar-schema",
            "SOAR create-script interface with playbook schema navigation and code editor",
            "Custom schema creation with context alongside the editor.",
            "dark",
          ),
          img(
            "soar-navigator",
            "SOAR Data Navigator showing schema data available to the script editor",
            "Playbook data available where the analyst needs it.",
            "dark",
          ),
        ],
        quote: {
          text: "This is a really cool feature.",
          attribution: "Security analyst · published user feedback",
        },
      },
      {
        id: "workflow",
        label: "03 / THE CONNECTED EXPERIENCE",
        title: "A clearer view of the response workflow.",
        paragraphs: [
          "Re-architecting the application was also a coordination problem. I partnered with stakeholders to identify gaps and align product direction with user and business needs, while onboarding and mentoring team members.",
          "The result connects navigation, playbook construction, and execution into a more understandable working experience.",
        ],
        images: [
          img(
            "soar-playbook",
            "QRadar SOAR playbook canvas displaying connected security response actions",
            "The playbook canvas: a connected view of automated defense actions.",
            "dark",
          ),
        ],
        link: {
          label: "Watch the analyst demo",
          href: "https://www.youtube.com/watch?v=aN-dHMhhSbU&t=410s",
        },
      },
    ],
    reflection:
      "A powerful enterprise tool does not have to assume that every expert is a programmer. Clear structure and the right information in context can broaden access without reducing capability.",
  },
  ueba: {
    chapter: "UX RESEARCH / THREAT INVESTIGATION",
    headline: "Don’t just surface an anomaly. Explain it.",
    summary:
      "A research-led exploration of how analysts understand suspicious behavior across users, devices, and the wider security environment.",
    challengeTitle: "A signal without context is another question.",
    challengePoints: [
      "The existing UBA experience had performance and configuration challenges.",
      "Analysts needed entity-level insight beyond user behavior alone.",
      "An unexplained score does not tell an analyst why something matters—or what to do next.",
    ],
    sections: [
      {
        id: "discovery",
        label: "01 / DISCOVERY & VALIDATION",
        title: "Understand the work before shaping the interface.",
        paragraphs: [
          "I led an audit of QRadar Classic UBA and competitor UEBA products, then established high-level jobs to be done and the personas involved in the workflow.",
          "The first generative research round used 60-minute interviews with four non-IBM customers, one IBM customer, and two internal MSS engineers. Findings covered configuration, context, deciding factors, use cases, a single-pane experience, and the threat of generative AI.",
        ],
        kind: "research",
        metrics: [
          { value: "7", label: "Discovery participants" },
          { value: "60 min", label: "In-depth interviews" },
          { value: "3", label: "Participant groups" },
        ],
        cards: [
          {
            title: "Configuration",
            description:
              "Understand the effort required to set up and maintain a useful experience.",
          },
          {
            title: "Context",
            description:
              "Show the relationship between the signal, the person or entity, and the environment.",
          },
          {
            title: "A single pane",
            description:
              "Reduce fragmentation while supporting deeper investigation.",
          },
        ],
        images: [
          img(
            "ueba-research",
            "UEBA research synthesis board with grouped interview findings",
            "Synthesizing the research into needs and opportunities.",
          ),
          img(
            "ueba-audit",
            "Competitive and existing-product audit for the UEBA initiative",
            "An audit of the existing experience and adjacent products.",
          ),
        ],
      },
      {
        id: "concepting",
        label: "02 / RAPID CONCEPTING",
        title: "Explore quickly. Critique openly. Refine with purpose.",
        paragraphs: [
          "I led a workshop using a structured four-step methodology for rapid ideation and refinement. Iterative concepts and critique helped the team align around the security analyst’s journey.",
          "We moved from sketches into mid-fidelity designs, using the flow to uncover additional use cases and get meaningful feedback before committing to visual detail.",
        ],
        images: [
          img(
            "ueba-sketches",
            "Hand-drawn UEBA concepts exploring connected investigation and context",
            "Early concepts: exploring ways to connect information and investigation.",
          ),
          img(
            "ueba-mid-fidelity",
            "UEBA mid-fidelity screens exploring profile and timeline information",
            "Mid-fidelity exploration of the profile and timeline experience.",
            "dark",
          ),
        ],
      },
      {
        id: "testing",
        label: "03 / USER TESTING",
        title: "The strongest feedback: show the why.",
        paragraphs: [
          "The second research round focused on the information analysts need when hunting and monitoring, particularly the user profile and timeline. It involved five non-IBM customers and three internal MSS analysts or engineers, again through 60-minute interviews.",
          "Three themes guided the next iteration: no black boxes, actionable insights, and the ability to take action. We shifted toward more context within a streamlined, single-pane experience.",
        ],
        kind: "research",
        metrics: [
          { value: "8", label: "Second-round participants" },
          { value: "5 + 3", label: "External + internal analysts" },
          { value: "60 min", label: "Research interviews" },
        ],
        cards: [
          {
            title: "No black boxes",
            description: "Make the reasoning behind an anomaly understandable.",
          },
          {
            title: "Actionable insight",
            description:
              "Connect the evidence to a meaningful security question.",
          },
          {
            title: "Ability to act",
            description:
              "Let the analyst continue the investigation without losing context.",
          },
        ],
      },
      {
        id: "concept",
        label: "04 / FINAL CONCEPT",
        title: "Turn an anomaly into a connected investigation.",
        paragraphs: [
          "The anomaly canvas lets analysts visually connect relevant nodes into a case. Instead of stopping at detection, the concept supports understanding the how and why behind a threat.",
          "Profiles, timelines, related entities, and supporting data become parts of the same investigation. This is the final concept presented in the original case study, rather than a claim of a shipped production feature.",
        ],
        images: [
          img(
            "ueba-canvas",
            "UEBA anomaly canvas showing connected nodes and supporting security data",
            "The investigation canvas: mapping the evidence around an anomaly.",
            "dark",
          ),
          img(
            "ueba-related-entities",
            "UEBA search interface for finding related entities and constructing an investigation",
            "Finding related entities to develop the investigation.",
            "dark",
          ),
        ],
      },
    ],
    reflection:
      "Trust comes from understanding. The research repeatedly pointed away from unexplained outputs and toward visible context, connected evidence, and a clear next action.",
  },
  libraries: {
    chapter: "DESIGN SYSTEMS / TEAM ENABLEMENT",
    headline: "Build the foundation. Give the team room to create.",
    summary:
      "A component architecture and shared design libraries that support different fidelity levels—and the people building with them.",
    challengeTitle: "Consistency has to scale beyond one screen.",
    challengePoints: [
      "Growing libraries need structure to stay adaptable and maintainable.",
      "Teams need useful foundations from early exploration through high-fidelity delivery.",
      "A system succeeds when designers understand how to build with it—not just where to find assets.",
    ],
    sections: [
      {
        id: "architecture",
        label: "01 / COMPONENT ARCHITECTURE",
        title: "A clear structure, from the base to the final component.",
        paragraphs: [
          "I focused on building and refining components through a structured layering approach. The goal was to support consistency and scalability while making the library easier to maintain.",
          "The data-table example shows how foundational bases and reusable items compose into a final component. The same architectural thinking supports a broader system of components and patterns.",
        ],
        kind: "architecture",
        images: [
          {
            src: imageUrl("library-components.webp"),
            alt: "Carbon data table architecture showing final tables, items, and bases",
            caption:
              "Three connected layers: foundational bases, reusable items, and final tables.",
          },
          img(
            "libraries-input-states",
            "Figma library containing documented input and component states",
            "Variation and state are part of the component architecture.",
          ),
        ],
      },
      {
        id: "fidelity",
        label: "02 / A LIBRARY FOR EACH STAGE",
        title: "The right foundation for the question at hand.",
        paragraphs: [
          "At IBM, I developed low-, mid-, and high-fidelity systems and contributed to the IBM Figma board. Organizational foundations and application libraries needed to support both exploration and delivery.",
          "I kept testing new component techniques, giving feedback on Figma features, and refining workflows to make the system adaptable throughout the product-development lifecycle.",
        ],
        cards: [
          {
            label: "01",
            title: "Low fidelity",
            description:
              "Shared foundations for early ideas and structural exploration.",
          },
          {
            label: "02",
            title: "Mid fidelity",
            description:
              "Reusable patterns for testing flows and interaction decisions.",
          },
          {
            label: "03",
            title: "High fidelity",
            description:
              "Application components ready for detailed design and handoff.",
          },
        ],
        images: [
          img(
            "libraries-mid-fidelity",
            "Mid-fidelity library cover with abstract wireframe components",
            "The mid-fidelity library: a shared space for exploring structure.",
            "dark",
          ),
          img(
            "libraries-carbon",
            "Carbon Design System cover showing reusable interface components",
            "High-fidelity foundations in the Carbon Design System.",
            "dark",
          ),
        ],
      },
      {
        id: "mentorship",
        label: "03 / MENTORSHIP & ADOPTION",
        title: "A stronger library. More confident designers.",
        paragraphs: [
          "I provided an initial component framework, then encouraged designers to think critically and solve implementation problems independently. Coaching helped them understand both the capabilities and limitations of Figma.",
          "Together, we built organized libraries for versions v10 and v11. The work connected component architecture with mentoring, application workflows, and a shared design language.",
        ],
        images: [
          img(
            "libraries-prototypes",
            "Figma interface showing a connected component and prototype exploration",
            "Exploring the relationships between components and interaction patterns.",
          ),
        ],
        link: {
          label: "Read about Carbon’s Red Dot recognition",
          href: "https://medium.com/carbondesign/carbon-design-system-wins-2022-red-dot-design-award-e200808c33ab",
        },
      },
    ],
    reflection:
      "A design system is also a teaching system. The architecture matters, but the ability of a team to understand, adapt, and extend it is what makes the work sustainable.",
  },
  ngsiem: {
    chapter: "PRODUCT STRATEGY / SECURITY ECOSYSTEM",
    headline: "One analyst journey. A connected product ecosystem.",
    summary:
      "Moving from siloed security applications toward a shared experience, grounded in user journeys and jobs to be done.",
    challengeTitle: "The analyst’s work does not stop at a product boundary.",
    challengePoints: [
      "Individual applications served isolated needs, without a seamless ecosystem.",
      "Cross-product workflows exposed missing context and capability gaps.",
      "Teams needed a shared direction that connected operational needs to a long-term roadmap.",
    ],
    sections: [
      {
        id: "research",
        label: "01 / RESEARCH & SYNTHESIS",
        title: "Find the gaps between the products.",
        paragraphs: [
          "I led primary and secondary research and helped the team synthesize the findings through affinity mapping. We looked across SIEM applications to understand where analyst workflows lost continuity.",
          "The work brought personas, operational needs, and missing features into focus. Partnering with subject matter experts kept the direction connected to the realities of security operations.",
        ],
        images: [
          img(
            "ngsiem-research",
            "Research and affinity synthesis board for the QRadar SIEM ecosystem",
            "Synthesizing cross-product needs and opportunities.",
          ),
        ],
      },
      {
        id: "alignment",
        label: "02 / CROSS-FUNCTIONAL ALIGNMENT",
        title: "A shared vision needs the whole system in the room.",
        paragraphs: [
          "I helped facilitate working sessions with product managers, development leads, architects, and design leads across the Security division. The purpose was to agree on the target experience before moving into individual features.",
          "We established personas and use cases, then mapped the steps and needs within each workflow to find opportunities for a more connected experience.",
        ],
        kind: "flow",
        cards: [
          {
            title: "Understand",
            description:
              "Use research and operational expertise to identify the missing connections.",
          },
          {
            title: "Align",
            description:
              "Bring stakeholders together around personas, use cases, and target experiences.",
          },
          {
            title: "Connect",
            description:
              "Translate shared priorities into cross-product journeys and a design roadmap.",
          },
        ],
        images: [
          img(
            "ngsiem-use-cases",
            "QRadar SIEM target use cases organized across security personas",
            "Target use cases bring the right personas and tasks into focus.",
          ),
        ],
      },
      {
        id: "jobs",
        label: "03 / JOBS TO BE DONE",
        title: "Turn a shared direction into work teams can act on.",
        paragraphs: [
          "With personas and use cases in place, I worked with the team to map user needs at each step. Journey maps revealed opportunities for innovation, and detailed jobs to be done made the desired experience concrete.",
          "Stakeholder alignment on those opportunities helped structure a multi-year design roadmap. The published case study describes a five-year company roadmap informed by this work.",
        ],
        images: [
          img(
            "ngsiem-jobs",
            "Jobs-to-be-done worksheet documenting an analyst task and supporting workflow needs",
            "From user need to an explicit job to be done.",
          ),
          img(
            "ngsiem-journey",
            "End-to-end journey map connecting analyst needs across the SIEM ecosystem",
            "An end-to-end journey across the security ecosystem.",
          ),
        ],
      },
    ],
    reflection:
      "The opportunity was in the connections. Following the analyst’s journey across product boundaries made it possible to turn separate applications into a more coherent strategic direction.",
  },
};
