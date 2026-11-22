import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useToggleAnimation } from '../../../core/animations/useToggleAnimation';

export function useFilterButtonAnimations(filterCount) {
  const clearAnim = useToggleAnimation(filterCount > 0);
  const [iconScale] = useState(() => new Animated.Value(1));
  const [badgeScale] = useState(() => new Animated.Value(filterCount > 0 ? 1 : 0));
  const prevCountRef = useRef(filterCount);

  useEffect(() => {
    if (prevCountRef.current === filterCount) return;
    prevCountRef.current = filterCount;

    Animated.sequence([
      Animated.timing(iconScale, { toValue: 1.24, duration: 110, useNativeDriver: true }),
      Animated.spring(iconScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();

    Animated.spring(badgeScale, {
      toValue: filterCount > 0 ? 1 : 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [iconScale, badgeScale, filterCount]);

  return {
    clearStyle: {
      maxWidth: clearAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 160] }),
      marginRight: clearAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 10] }),
      opacity: clearAnim,
    },
    iconStyle: { transform: [{ scale: iconScale }] },
    badgeStyle: { transform: [{ scale: badgeScale }] },
  };
}
