import type { Project } from "./content";

export function homeUrl(section = "") {
  return `${import.meta.env.BASE_URL}${section ? `#${section}` : ""}`;
}

export function projectUrl(project: Project) {
  return `${import.meta.env.BASE_URL}${project.sourcePath}/`;
}
