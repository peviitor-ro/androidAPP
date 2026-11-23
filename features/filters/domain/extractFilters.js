import { CHILD_BY_ID, JOB_TYPE_ORDER } from '../data/filterItems';

export const extractFilters = (selectedIds) => {
  const cities = [];
  const counties = [];
  const remote = [];

  for (const id of selectedIds) {
    const item = CHILD_BY_ID.get(id);
    if (!item) continue;
    if (item.groupId === 0) {
      cities.push(item.city);
      counties.push(item.county);
    } else if (item.groupId === 20000) {
      remote.push(item.type);
    }
  }

  return { cities, counties, remote };
};

export const splitFilterChips = (selectedIds) => {
  const selectedSet = new Set(selectedIds);
  const jobTypeChips = JOB_TYPE_ORDER
    .filter((id) => selectedSet.has(id))
    .map((id) => CHILD_BY_ID.get(id));
  const cityChips = selectedIds
    .filter((id) => CHILD_BY_ID.get(id)?.groupId === 0)
    .map((id) => CHILD_BY_ID.get(id));

  return { jobTypeChips, cityChips };
};
