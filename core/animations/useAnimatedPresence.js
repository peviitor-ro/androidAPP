import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

// Animeaza intrarea (spring) si iesirea (timing) unui element;
// apeleaza `onExited` dupa terminarea animatiei de iesire ca parintele sa il poata demonta.
export function useAnimatedPresence(isExiting, onExited, { duration = 140, minScale = 0.75 } = {}) {
  const [anim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!isExiting) {
      Animated.spring(anim, { toValue: 1, friction: 6, useNativeDriver: true }).start();
      return;
    }

    Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }).start(
      ({ finished }) => {
        if (finished) onExited();
      },
    );
  }, [anim, isExiting, duration, onExited]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [minScale, 1] });
  return { opacity: anim, transform: [{ scale }] };
}
