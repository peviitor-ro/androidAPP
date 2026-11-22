import { getJobs } from '../../landing/data/landing.service';

export const fetchRecommendedJobs = async (queries, targetTotal = 20) => {
  if (!queries || queries.length === 0) return [];

  const totalCount = queries.reduce((acc, q) => acc + q.count, 0);
  if (totalCount === 0) return [];

  const requests = queries.map(async (q) => {
    const limit = Math.max(1, Math.round((q.count / totalCount) * targetTotal));
    try {
      const data = await getJobs(`search=${encodeURIComponent(q.text)}&page=1`);
      return (data?.results || []).slice(0, limit);
    } catch {
      return [];
    }
  });

  const results = await Promise.all(requests);
  const seenIds = new Set();
  const jobs = [];
  const maxLen = Math.max(...results.map((r) => r.length), 0);

  for (let i = 0; i < maxLen; i++) {
    for (const list of results) {
      const job = list[i];
      if (!job || seenIds.has(job.id)) continue;

      seenIds.add(job.id);
      jobs.push(job);
      if (jobs.length >= targetTotal) return jobs;
    }
  }

  return jobs;
};
