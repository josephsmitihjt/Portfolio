/** Resolve local assets for root hosting and GitHub Pages repository subpaths. */
export function imageUrl(filename: string) {
  return `${import.meta.env.BASE_URL}images/${filename}`;
}
