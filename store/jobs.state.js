import { create } from 'zustand';

export const INITIAL_JOBS_STATE = {
  search: '',
  cities: '',
  counties: '',
  remote: '',
  selectedFilterIds: [],
  jobs: [],
};

const useJobsOptionsStore = create((set) => ({
  ...INITIAL_JOBS_STATE,
  setSearch: (searchString) => set(() => ({ search: searchString })),
  setCities: (cities) => set(() => ({ cities })),
  setRemote: (remote) => set(() => ({ remote })),
  setCounties: (counties) => set(() => ({ counties })),
  setSelectedFilterIds: (selectedFilterIds) => set(() => ({ selectedFilterIds })),
  setJobs: (jobs) => set(() => ({ jobs })),
  reset: () => set(() => ({ ...INITIAL_JOBS_STATE })),
}));

export default useJobsOptionsStore;
