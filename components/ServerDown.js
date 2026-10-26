import { View, Text, StyleSheet } from 'react-native';
import Strut from '../assets/svg/Strut';
import COLORS from '../constants/COLORS';

export default function ServerDown() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serverul este indisponibil momentan</Text>
      <Text style={styles.text}>
        Te rugăm să încerci din nou puțin mai târziu.
      </Text>
      <Strut style={styles.svg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  svg: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background_green,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.border_grey,
    textAlign: 'center',
  },
});
