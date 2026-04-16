export function formatDate(val?: string) {
  if (!val) return "—";
  return new Date(val).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
