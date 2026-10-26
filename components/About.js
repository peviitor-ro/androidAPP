import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import COLORS from '../constants/COLORS';
import Dungi from '../assets/svg/Dungi';

export default function About({ jobs }) {
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 375;
  const isTablet = width >= 768;

  const titleSize = isTablet ? 42 : isSmallScreen ? 28 : 34;
  const subtitleSize = isTablet ? 18 : 15;
  const highlightWidth = isTablet ? 150 : isSmallScreen ? 95 : 120;
  const underlineTop = isTablet ? -4 : -2;

  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleSize * 1.15 }]}>
          Locul de muncă visat,
        </Text>

        <View style={styles.highlightRow}>
          <Text
            style={[
              styles.title,
              styles.secondaryTitle,
              { fontSize: titleSize, lineHeight: titleSize * 1.15 },
            ]}
          >
            la
          </Text>

          <View style={styles.highlightWrap}>
            <Text
              style={[
                styles.title,
                styles.highlightText,
                { fontSize: titleSize, lineHeight: titleSize * 1.15 },
              ]}
            >
              un click
            </Text>
            <Dungi
              style={[
                styles.underline,
                { width: highlightWidth, marginTop: underlineTop },
              ]}
            />
          </View>

          <Text
            style={[
              styles.title,
              styles.secondaryTitle,
              { fontSize: titleSize, lineHeight: titleSize * 1.15 },
            ]}
          >
            distanță
          </Text>
        </View>
      </View>

      <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
        Peste
        <Text style={styles.jobsCount}> {jobs} </Text>
        locuri de muncă din România actualizate zilnic
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  titleBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 2,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.text_orange,
  },
  secondaryTitle: {
    color: COLORS.background_green,
  },
  highlightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
    rowGap: 2,
  },
  highlightWrap: {
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  highlightText: {
    color: COLORS.text_orange,
  },
  underline: {
    height: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.background_green,
    maxWidth: 520,
  },
  jobsCount: {
    color: COLORS.text_orange,
    fontWeight: 'bold',
  },
});
