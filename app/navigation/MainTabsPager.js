import { useEffect } from 'react';
import { View, Animated, StyleSheet, BackHandler, useWindowDimensions } from 'react-native';
import Home from '../../features/landing/Home';
import Results from '../../features/job_search/Results';
import Saved from '../../features/jobs/Saved';
import { BottomBar } from '../../shared/components/BottomBar';
import { TAB_ROUTES, useTabPager } from './TabPagerContext';

const SCREENS = [Home, Results, Saved];

export function MainTabsPager() {
  const { width } = useWindowDimensions();
  const {
    currentRoute,
    navigateTo,
    scrollRef,
    scrollX,
    pagerScrollEnabled,
    onMomentumScrollEnd,
  } = useTabPager();

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentRoute === 'Acasă') return false;
      navigateTo('Acasă');
      return true;
    });
    return () => sub.remove();
  }, [currentRoute, navigateTo]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={pagerScrollEnabled}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={styles.pager}
      >
        {SCREENS.map((Screen, index) => (
          <View key={TAB_ROUTES[index]} style={{ width }}>
            <Screen />
          </View>
        ))}
      </Animated.ScrollView>
      <BottomBar
        currentRoute={currentRoute}
        onSelect={navigateTo}
        scrollX={scrollX}
        pageWidth={width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
});
