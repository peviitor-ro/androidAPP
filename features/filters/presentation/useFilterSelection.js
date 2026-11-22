import { LayoutAnimation } from 'react-native';
import useJobStore from '../../job_search/data/jobs.state';
import { extractFilters } from '../domain/extractFilters';

export const useFilterSelection = () => {
  const { selectedFilterIds, setSelectedFilterIds, setCities, setCounties, setRemote } =
    useJobStore();

  const applySelection = (nextIds) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedFilterIds(nextIds);
    const { cities, counties, remote } = extractFilters(nextIds);
    setCities(cities);
    setCounties(counties);
    setRemote(remote);
  };

  const clearSelection = (selectRef) => {
    selectRef?.current?._removeAllItems();
    applySelection([]);
  };

  return { selectedFilterIds, applySelection, clearSelection };
};
