import { useEffect } from 'react';
import { View, Animated, StyleSheet, BackHandler, useWindowDimensions } from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
import Home from '../../features/landing/Home';
import Results from '../../features/job_search/Results';
import Saved from '../../features/jobs/Saved';
import { BottomBar } from '../../shared/components/BottomBar';
import { TAB_ROUTES, useTabPager } from './TabPagerContext';

const SCREENS = [Home, Results, Saved];
const AnimatedGestureScrollView = Animated.createAnimatedComponent(GestureScrollView);

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

  const hasVerticalScroll = currentRoute !== 'Acasă';

  return (
    <View style={styles.container}>
      <AnimatedGestureScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={pagerScrollEnabled}
        activeOffsetX={hasVerticalScroll ? [-50, 50] : [-20, 20]}
        failOffsetY={hasVerticalScroll ? [-5, 5] : [-40, 40]}
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
      </AnimatedGestureScrollView>
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
