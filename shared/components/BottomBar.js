import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  { name: 'Acasă', activeIcon: 'home', inactiveIcon: 'home-outline' },
  { name: 'Rezultate', activeIcon: 'list', inactiveIcon: 'list-outline' },
  { name: 'Salvate', activeIcon: 'heart', inactiveIcon: 'heart-outline' },
];

export function BottomBar({ currentRoute, onSelect }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const focused = currentRoute === tab.name;
        const color = focused ? 'tomato' : 'gray';
        const iconName = focused ? tab.activeIcon : tab.inactiveIcon;

        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => {
              if (focused) return;
              onSelect(tab.name);
            }}
          >
            <Ionicons name={iconName} size={24} color={color} />
            <Text style={[styles.label, { color }]}>{tab.name}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
  },
});
