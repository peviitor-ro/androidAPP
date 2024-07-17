import PUBLIC_API from '../Api';

export const getJobs = async (query) => {
  const response = await PUBLIC_API.get(`?${query}`);
  return response.data;
};

export const total = async () => {
  const response = await PUBLIC_API.get(`/total/`);
  return response.data;
};
