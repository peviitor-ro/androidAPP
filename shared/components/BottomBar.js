import { View, Pressable, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  { name: 'Acasă', activeIcon: 'home', inactiveIcon: 'home-outline' },
  { name: 'Rezultate', activeIcon: 'list', inactiveIcon: 'list-outline' },
  { name: 'Salvate', activeIcon: 'heart', inactiveIcon: 'heart-outline' },
];

export function BottomBar({ currentRoute, onSelect, scrollX, pageWidth }) {
  const safeWidth = pageWidth || 1;

  return (
    <View style={styles.container}>
      {TABS.map((tab, index) => {
        const focused = currentRoute === tab.name;
        const inputRange = [
          (index - 1) * safeWidth,
          index * safeWidth,
          (index + 1) * safeWidth,
        ];
        const activeOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const inactiveOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.08, 1],
          extrapolate: 'clamp',
        });

        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => {
              if (focused) return;
              onSelect(tab.name);
            }}
          >
            <View style={styles.iconWrapper}>
              <Animated.View style={[styles.iconLayer, { opacity: inactiveOpacity }]}>
                <Ionicons name={tab.inactiveIcon} size={24} color="gray" />
              </Animated.View>
              <Animated.View
                style={[
                  styles.iconLayer,
                  { opacity: activeOpacity, transform: [{ scale }] },
                ]}
              >
                <Ionicons name={tab.activeIcon} size={24} color="tomato" />
              </Animated.View>
            </View>
            <View style={styles.labelWrapper}>
              <Animated.Text
                style={[styles.label, styles.inactiveLabel, { opacity: inactiveOpacity }]}
              >
                {tab.name}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.label,
                  styles.activeLabel,
                  styles.labelOverlay,
                  { opacity: activeOpacity },
                ]}
              >
                {tab.name}
              </Animated.Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f6f0ec',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d8d0c8',
    height: 56,
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconWrapper: {
    width: 24,
    height: 24,
  },
  iconLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
  },
  labelOverlay: {
    position: 'absolute',
  },
  inactiveLabel: {
    color: 'gray',
  },
  activeLabel: {
    color: 'tomato',
  },
});
