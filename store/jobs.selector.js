import { useJobsOptionsStore } from './jobs.state';

export default function useJobsOptionsSelector() {
  const search = useJobsOptionsStore((state) => state.search);
  const cities = useJobsOptionsStore((state) => state.cities);
  const remote = useJobsOptionsStore((state) => state.remote);
  const counties = useJobsOptionsStore((state) => state.counties);
  const reset = useJobsOptionsStore((state) => state.reset);
  const setSearch = useJobsOptionsStore((state) => state.setSearch);
  const setCities = useJobsOptionsStore((state) => state.setCities);
  const setRemote = useJobsOptionsStore((state) => state.setRemote);
  const setCounties = useJobsOptionsStore((state) => state.setCounties);

  const isEmpty =
    cities === '' && counties === '' && remote === '' && search === '';

  return {
    search,
    cities,
    remote,
    counties,
    reset,
    setSearch,
    setCities,
    setRemote,
    setCounties,
    isEmpty,
  };
}
