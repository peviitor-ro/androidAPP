import { View, Text, StyleSheet, Platform } from 'react-native';
import COLORS from '../constants/COLORS';
import Dungi from '../assets/svg/Dungi';

export default function About({ jobs }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Locul de muncă visat, la{' '}
        <View style={styles.inlineContainer}>
          <Text style={styles.middleText}>un click</Text>
          <Dungi style={styles.svg} />
        </View>{' '}
        distanță.
      </Text>
      <Text style={styles.h4}>
        Peste
        <Text style={styles.span}> {jobs} </Text>
        locuri de muncă din România actualizate zilnic.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },

  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text_orange,
    marginHorizontal: 20,
  },

  h4: {
    fontSize: 14,
    marginHorizontal: 20,
  },

  inlineContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    height:30,
  },
  middleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text_orange,
  },
  svg: {
    width: 100,
    height: 10,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 28,
      },
      android: {
        top: 30,
      },
    }),
  },
  span: {
    color: COLORS.text_orange,
    fontWeight: 'bold',
  },
});


