import { createContext, useContext, useRef, useState, useCallback } from 'react';
import { Animated, useWindowDimensions } from 'react-native';

export const TAB_ROUTES = ['Acasă', 'Rezultate', 'Salvate'];

const TabPagerContext = createContext({
  currentRoute: 'Acasă',
  navigateTo: () => {},
  scrollRef: null,
  scrollX: new Animated.Value(0),
  width: 0,
  pagerScrollEnabled: true,
  setPagerScrollEnabled: () => {},
  onMomentumScrollEnd: () => {},
});

export function TabPagerProvider({ children }) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef(null);
  const [scrollX] = useState(() => new Animated.Value(0));
  const [currentRoute, setCurrentRoute] = useState('Acasă');
  const [pagerScrollEnabled, setPagerScrollEnabled] = useState(true);

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
      value={{
        currentRoute,
        navigateTo,
        scrollRef,
        scrollX,
        width,
        pagerScrollEnabled,
        setPagerScrollEnabled,
        onMomentumScrollEnd,
      }}
    >
      {children}
    </TabPagerContext.Provider>
  );
}

export function useTabPager() {
  return useContext(TabPagerContext);
}
