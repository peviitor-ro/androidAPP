import { View, Text, StyleSheet } from 'react-native';
import Strut from '../assets/svg/Strut';
import COLORS from "../constants/COLORS";

export default function NoResults() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ups! Căutarea nu are rezultat...</Text>
      <Strut style={styles.svg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  svg: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background_green,
  },
});


