import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useQueriesStore = create(
  persist(
    (set, get) => ({
      queries: [],
      addQueries: (newQueries = []) => {
        const valid = (Array.isArray(newQueries) ? newQueries : [newQueries]).filter(Boolean);
        const map = new Map(get().queries.map((item) => [item.text, item.count]));
        valid.forEach((text) => map.set(text, (map.get(text) || 0) + 1));

        const updated = Array.from(map.entries())
          .map(([text, count]) => ({ text, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        set({ queries: updated });
      },
      removeQueries: (queries = []) => {
        const array = Array.isArray(queries) ? queries : [queries];
        const counts = array.reduce((acc, t) => {
          if (t) acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {});

        const updated = get()
          .queries.map((item) => {
            const dec = counts[item.text] || 0;
            return dec ? { ...item, count: item.count - dec } : item;
          })
          .filter((item) => item.count > 0)
          .sort((a, b) => b.count - a.count);

        set({ queries: updated });
      },
      clearQueries: () => set({ queries: [] }),
    }),
    {
      name: 'queries-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
