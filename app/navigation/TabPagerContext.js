import { createContext, useContext, useRef, useState, useCallback } from 'react';
import { useWindowDimensions } from 'react-native';

export const TAB_ROUTES = ['Acasă', 'Rezultate', 'Salvate'];

const TabPagerContext = createContext({
  currentRoute: 'Acasă',
  navigateTo: () => {},
  scrollRef: null,
  onMomentumScrollEnd: () => {},
});

export function TabPagerProvider({ children }) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef(null);
  const [currentRoute, setCurrentRoute] = useState('Acasă');

  const navigateTo = useCallback(
    (name) => {
      const index = TAB_ROUTES.indexOf(name);
      if (index === -1) return;
      setCurrentRoute(name);
      scrollRef.current?.scrollTo({ x: index * width, animated: true });
    },
    [width]
  );

  const onMomentumScrollEnd = useCallback(
    (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / width);
      const route = TAB_ROUTES[index];
      if (route) setCurrentRoute(route);
    },
    [width]
  );

  return (
    <TabPagerContext.Provider
      value={{ currentRoute, navigateTo, scrollRef, onMomentumScrollEnd }}
    >
      {children}
    </TabPagerContext.Provider>
  );
}

export function useTabPager() {
  return useContext(TabPagerContext);
}
