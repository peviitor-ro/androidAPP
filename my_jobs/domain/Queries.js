const REGEX = /[^a-zA-Z0-9ăâîșțĂÂÎȘȚ\s]+/;
const ONLY_DIGITS = /^\d+$/;

export function extractQueries(jobTitle) {
  if (!jobTitle) return [];
  return jobTitle
    .split(REGEX)
    .map((q) => q.trim())
    .filter((q) => q.length > 4 && !ONLY_DIGITS.test(q));
}
