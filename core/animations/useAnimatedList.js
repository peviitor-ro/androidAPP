import { useCallback, useMemo, useState } from 'react';

// Pastreaza ordinea din `next`, dar re-insereaza temporar elementele sterse din `prev`
// la pozitia lor anterioara ca sa poata rula animatia de iesire inainte de demontare.
const mergeItems = (prev, next, nextIds) => {
  const result = [...next];
  prev.forEach((item, idx) => {
    if (nextIds.has(item.id)) return;
    result.splice(Math.min(idx, result.length), 0, item);
  });
  return result;
};

// Mentine elementele eliminate in `renderedItems` pana cand `handleExited(id)` confirma
// ca animatia de iesire s-a terminat.
export function useAnimatedList(activeItems, key) {
  const activeIds = useMemo(() => new Set(activeItems.map((item) => item.id)), [activeItems]);
  const [renderedItems, setRenderedItems] = useState(activeItems);
  const [prevKey, setPrevKey] = useState(key);

  if (key !== prevKey) {
    setPrevKey(key);
    setRenderedItems(mergeItems(renderedItems, activeItems, activeIds));
  }

  const handleExited = useCallback((id) => {
    setRenderedItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { renderedItems, activeIds, handleExited };
}
