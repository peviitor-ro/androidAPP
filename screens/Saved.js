import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { JobContext } from '../context/JobContext';
import Background from '../components/Background';
import JobList from '../components/JobList';
import COLORS from '../constants/COLORS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: COLORS.background_green,
    fontSize: 18,
  },
});

export default function Saved() {
  const { savedJobs } = React.useContext(JobContext);

  return (
    <Background>
      <View style={styles.container}>
        {savedJobs.length === 0 ? (
          <Text style={styles.text}>Niciun anunț salvat momentan.</Text>
        ) : (
          <JobList data={savedJobs} />
        )}
      </View>
    </Background>
  );
}
