import { useInfiniteQuery } from '@tanstack/react-query';
import { getJobs } from '../services/landing/landing.service';

export function useJobsInfiniteQuery(search, cities, counties, remote) {
  return useInfiniteQuery({
    queryKey: ['jobs', search, cities, counties, remote],
    queryFn: ({ pageParam }) =>
      getJobs(
        `search=${search}&page=${pageParam}&cities=${cities || ''}&counties=${
          counties || ''
        }&remote=${remote || ''}`,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextPage = url.searchParams.get('page');

        return nextPage;
      }
    },
  });
}
