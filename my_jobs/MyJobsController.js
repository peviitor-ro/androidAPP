import { useState, useEffect } from 'react';
import { useQueriesStore } from './data/my_jobs.store';
import { extractQueries } from './domain/Queries';
import { fetchRecommendedJobs } from './data/recommended_jobs.service';

export const useMyJobsController = () => {
  const queries = useQueriesStore((state) => state.queries);
  const addQueries = useQueriesStore((state) => state.addQueries);
  const removeQueries = useQueriesStore((state) => state.removeQueries);
  const clearQueries = useQueriesStore((state) => state.clearQueries);

  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!queries || queries.length === 0) {
      setRecommendedJobs([]);
      return;
    }

    setIsLoadingRecommended(true);
    fetchRecommendedJobs(queries, 20)
      .then((jobs) => {
        if (isMounted) setRecommendedJobs(jobs);
      })
      .finally(() => {
        if (isMounted) setIsLoadingRecommended(false);
      });

    return () => {
      isMounted = false;
    };
  }, [queries]);

  const onJobSaved = (job) => {
    const extracted = extractQueries(job?.job_title);
    if (extracted.length) addQueries(extracted);
  };

  const onJobRemoved = (job) => {
    const extracted = extractQueries(job?.job_title);
    if (extracted.length) removeQueries(extracted);
  };

  return {
    queries,
    recommendedJobs,
    isLoadingRecommended,
    onJobSaved,
    onJobRemoved,
    clearQueries,
  };
};
