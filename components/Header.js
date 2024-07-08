import { View, StyleSheet, Platform } from 'react-native';
import Logo from '../assets/svg/Logo';

export default function Header() {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        marginTop: 40,
      },
    }),
  }
});
