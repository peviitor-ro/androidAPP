import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const ToastContext = createContext({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const anim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  const hideToast = useCallback(() => {
    Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: true }).start(
      ({ finished }) => {
        if (finished) setMessage(null);
      },
    );
  }, [anim]);

  const showToast = useCallback(
    (text, duration = 2000) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setMessage(text);
      anim.stopAnimation();
      Animated.timing(anim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      timerRef.current = setTimeout(hideToast, duration);
    },
    [anim, hideToast],
  );

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message ? (
        <Animated.View
          pointerEvents="none"
          style={[styles.toast, { opacity: anim, transform: [{ translateY }] }]}
        >
          <Text style={styles.text}>{message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 84,
    alignSelf: 'center',
    backgroundColor: 'rgba(25, 35, 38, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});
