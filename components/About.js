import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import COLORS from '../constants/COLORS';
import Dungi from '../assets/svg/Dungi';

export default function About({ jobs }) {
 const { width } = Dimensions.get('window');

 const [isSmallScreen, setIsSmallScreen] = useState(width < 375);

  useEffect(() => {
    const handleResize = () => {
      const { width } = Dimensions.get('window');
      setIsSmallScreen(width < 375);
    };

    handleResize();
  }, [width]);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Locul de muncă visat, la{' '}
        <View style={[styles.inlineContainer, 
          isSmallScreen ? {height: 33} : {height: 30}
        ]}>
          <Text style={styles.middleText}>un click</Text>
          <Dungi style={styles.svg} />
        </View>{' '}
        distanță
      </Text>
      <Text style={styles.h4}>
        Peste
        <Text style={styles.span}> {jobs} </Text>
        locuri de muncă din România actualizate zilnic
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
    bottom: -10,
  },
  span: {
    color: COLORS.text_orange,
    fontWeight: 'bold',
  },
});


