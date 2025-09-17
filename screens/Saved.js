import React from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { JobContext } from '../context/JobContext';
import Background from '../components/Background';
import Card from '../components/Card';
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
  scrollView: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default function Saved() {
  const { savedJobs } = React.useContext(JobContext);

  return (
    <Background>
      <View style={styles.container}>
        {savedJobs.length === 0 ? (
          <Text style={styles.text}>
            Niciun job salvat momentan.
          </Text>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          >
            {savedJobs.map((job, index) => (
              <Card key={index} job={job} />
            ))}
          </ScrollView>
        )}
      </View>
    </Background>
  );
}
