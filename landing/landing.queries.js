import { useInfiniteQuery } from '@tanstack/react-query';
import { getJobs } from '../services/landing/landing.service';

export function useJobsInfiniteQuery(search) {
  return useInfiniteQuery({
    queryKey: ['jobs', search],
    queryFn: ({ pageParam }) =>
      getJobs(`search=${search}&page=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextPage = url.searchParams.get('page');
        return nextPage;
      }
    }
  });
}
