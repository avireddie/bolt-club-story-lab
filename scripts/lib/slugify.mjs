/**
 * @param {string} title
 * @returns {string}
 */
export function slugify(title) {
  if (!title || typeof title !== "string") return "mission";
  const s = title
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return (s || "mission").slice(0, 72);
}
