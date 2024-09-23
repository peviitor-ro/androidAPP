import { View, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/svg/Logo';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View
      style={styles.container}
      onTouchStart={() => navigation.navigate('Acasă')}
    >
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
  },
});
