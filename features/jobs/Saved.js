import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { JobContext } from './data/JobContext';
import Background from '../../core/components/Background';
import JobList from './JobList';
import COLORS from '../../core/theme/COLORS';
import { useMyJobsController } from './presentation/MyJobsController';

export default function Saved() {
  const { savedJobs } = React.useContext(JobContext);
  const { recommendedJobs } = useMyJobsController();

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.headerTitle}>Joburi salvate</Text>
          {savedJobs.length === 0 ? (
            <Text style={styles.emptyText}>Niciun anunț salvat momentan.</Text>
          ) : (
            <JobList data={savedJobs} scrollEnabled={false} />
          )}
        </View>

        {recommendedJobs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.headerTitle}>Recomandări de joburi</Text>
            <JobList data={recommendedJobs} scrollEnabled={false} />
          </View>
        )}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  emptyText: {
    color: COLORS.background_green,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    color: COLORS.background_green,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
