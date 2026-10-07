# Joseph Smith — Portfolio

A responsive React and TypeScript portfolio based on the content, imagery, and black/off-white/red identity of [jtsmith.design](https://jtsmith.design/). The layout is a refined interpretation of the published site. The linked Figma Sites editor was blocked by the environment network proxy, so its private frames, component specifications, and prototype transitions have **not** been inspected.

## Development

Use the existing `/workspace/Portfolio` checkout. Cloud tasks are already isolated; a separate Git worktree is unnecessary.

Node 24.19.0 and npm were used for validation. Install the exact locked dependencies, then start Vite:

```sh
cd /workspace/Portfolio
npm ci --cache /tmp/portfolio-npm-cache
npm run dev
```

The development command listens on all interfaces. To check the production bundle:

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to any static host. All fonts and project images are served locally. Headings use Science Gothic Regular, body text uses Montserrat Medium, and accent labels use Doto Black. Text is at least 14px across all breakpoints. There are no required API keys, external runtime services, or backend dependencies.

## GitHub Pages

The workflow `.github/workflows/deploy-pages.yml` builds and deploys on pushes to `main` and can also be run manually from the Actions tab. It uses GitHub's official Pages artifact and deployment actions; no personal access token is stored in the repository.

In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. If Pages is unavailable, check whether your GitHub plan supports Pages for this private repository. The setup does not change repository visibility.

After enabling Pages, open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. A successful deployment will show the live site URL. The expected default URL is `https://josephsmitihjt.github.io/Portfolio/`; it becomes available only after Pages is enabled and deployment succeeds. A configured custom domain can change that URL.

The workflow builds with `/Portfolio/` as the base path. Image and favicon URLs follow Vite's base, so both repository hosting and root hosting work. To validate the Pages build locally:

```sh
npm run build -- --base=/Portfolio/
PORTFOLIO_TEST_BASE_PATH=/Portfolio/ npm test
```

For root hosting, use the ordinary `npm run build` and `npm test` commands.

## Validation

```sh
npm run build
npm test
```

Playwright uses the cloud machine's `/usr/bin/chromium`. On another machine, point `PORTFOLIO_BROWSER_PATH` to a Chromium executable. Tests serve the production build on port 4173; run the build before testing.

Tests cover project filtering, all five case-study routes and refreshes, local project imagery, section and next-project navigation, toolbar comparison and component-layer states, URL sharing, browser history, contact-dialog keyboard focus and focus restoration, Google Form contact handoff and case-study clipboard behavior, theme persistence, mobile navigation, small-screen overflow, reduced motion, local asset loading, and automated WCAG 2 AA checks with axe in both themes. Automated checks complement manual review; they are not an accessibility certification.

## Components and content

- `src/content.ts`: name, public links, project descriptions, roles, outcomes, employment, and process copy.
- `src/components/Layout.tsx`: sticky navigation, mobile menu, theme control, and footer.
- `src/components/Hero.tsx`: portrait, introduction, and recognition strip.
- `src/components/Projects.tsx`: filters and project links to dedicated pages.
- `src/components/About.tsx` and `Approach.tsx`: biography, experience, and process accordion.
- `src/components/Contact.tsx`: contact section and a Google Form handoff modal.
- `src/components/shared.tsx`: viewport reveals and native modal behavior.
- `src/styles.css`: visual tokens, responsive layouts, hover/active/focus states, and motion preferences.

Each project has a dedicated page: `/kwikkart-project/`, `/soar-playbooks-project/`, `/ueba-project/`, `/figma-initiative/`, and `/qradar-ngsiem-project/`. Vite builds a separate HTML entry for each route, so direct links and refreshes work on static hosting, including GitHub Pages. Older query-string links redirect to these pages.

`src/components/CaseStudy.tsx` provides the page layout, section navigation, image galleries, toolbar comparison, component-layer explorer, impact section, and next-project navigation. `src/caseStudies.ts` contains each project's distinct narrative and figures; `src/case-studies.css` styles the responsive pages. Image sources are recorded in `docs/project-assets.json`.

The contact dialog opens the owner’s Google Form in a new tab. Visitors submit their details through Google Forms; the portfolio does not collect or store their contact information. Enable **Responses → More → Get email notifications for new responses** in Google Forms to receive submission alerts. Theme preference is the only local-storage value.

## Content provenance

Content is adapted from the public home page, `/aboutme`, `/resume`, `/kwikkart-project`, `/soar-playbooks-project`, `/ueba-project`, `/figma-initiative`, and `/qradar-ngsiem-project` on `jtsmith.design`. This portfolio hosts the complete case-study pages.

KwikKart uses public material only and retains the NDA notice. SOAR performance numbers are presented as outcomes reported by the original case study. The SIEM revenue projection is not presented as realized revenue. Conflicting design-library efficiency percentages were omitted in favor of documented deliverables. UEBA's final experience remains identified as a concept.

Local image assets were downloaded from the same site and resized/compressed to WebP without changing their content:

| Local asset               | Original asset under `https://jtsmith.design/_assets/v11/` |
| ------------------------- | ---------------------------------------------------------- |
| `joseph-smith.webp`       | `457ed10452ab77c853942bc8eee7c9c130c3db3b.png`             |
| `kwikkart.webp`           | `379c5a3db902ba90bf1484f68a11ff7eec8efa51.png`             |
| `soar-playbooks.webp`     | `8fff8b852e6dd3a33789ca73c29226e2f6229fdf.png`             |
| `ueba.webp`               | `882f20dfa40d7424d4c764196d331189691628c5.png`             |
| `ngsiem.webp`             | `bb8c4af499e202f7ed9493a01a429556e7385b8d.png`             |
| `figma.webp`              | `c3caa5a44a7137ff67090bf08995e40090750281.png`             |
| `library-components.webp` | `6caf20347c90eb101ac84cb02f4beae5b01e535a.png`             |
| `soar-detail.webp`        | `1675af2425a01560a137ec34864335e9d07120a4.png`             |
| `ueba-detail.webp`        | `4f3e9554a63a9b303116deaa2805d8ccd1bbb31f.png`             |

No client data, credentials, or unpublished design files are included.

The UEBA final-concept section embeds the supplied prototype recording as a silent, user-controlled MP4 with a poster and an expandable walkthrough description. The original video frames are preserved, the audio is removed at the owner’s request, and fast-start metadata supports streaming. Playback does not start automatically.
