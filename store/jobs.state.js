import { create } from 'zustand';

export const INITIAL_JOBS_STATE = {
  search: '',
  jobs: [],
};

const useJobsOptionsStore = create((set) => ({
  ...INITIAL_JOBS_STATE,
  setSearch: (searchString) => set(() => ({ search: searchString })),
  setJobs: (jobs) => set(() => ({ jobs })), 
  reset: () => set(() => ({ ...INITIAL_JOBS_STATE })),
}));

export default useJobsOptionsStore;
