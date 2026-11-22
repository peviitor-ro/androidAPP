import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

export function useToggleAnimation(active, { duration = 220, useNativeDriver = false } = {}) {
  const [anim] = useState(() => new Animated.Value(active ? 1 : 0));

  useEffect(() => {
    Animated.timing(anim, {
      toValue: active ? 1 : 0,
      duration,
      useNativeDriver,
    }).start();
  }, [anim, active, duration, useNativeDriver]);

  return anim;
}
