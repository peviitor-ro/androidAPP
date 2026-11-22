import useJobStore from '../../job_search/data/jobs.state';
import { extractFilters } from '../domain/extractFilters';

export const useFilterSelection = () => {
  const { selectedFilterIds, setSelectedFilterIds, setCities, setCounties, setRemote } =
    useJobStore();

  const applySelection = (nextIds) => {
    setSelectedFilterIds(nextIds);
    const { cities, counties, remote } = extractFilters(nextIds);
    setCities(cities);
    setCounties(counties);
    setRemote(remote);
  };

  return { selectedFilterIds, applySelection };
};
