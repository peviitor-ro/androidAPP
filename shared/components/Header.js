import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/svg/Logo';
import { useTabPager } from '../../app/navigation/TabPagerContext';

export default function Header() {
  const { navigateTo } = useTabPager();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'ios' ? { paddingTop: insets.top + 8 } : null,
      ]}
    >
      <Pressable onPress={() => navigateTo('Acasă')}>
        <Logo />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
