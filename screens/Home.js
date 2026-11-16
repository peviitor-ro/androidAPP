import { StyleSheet, ScrollView, View } from 'react-native';
import { useState, useEffect } from 'react';
import { total } from '../services/landing/landing.service';
import Background from '../components/Background';
import About from '../components/About';
import Search from '../components/Search';
import { FilterPills } from '../features/filters/FilterPills';
import Racheta from '../assets/svg/Racheta';

export default function Home() {
  const [jobs, setJobs] = useState(0);

  useEffect(() => {
    total().then((res) => setJobs(res.total));
  }, []);

  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollView}
      >
        <About jobs={jobs} />
        <View style={styles.searchGroup}>
          <Search />
          <FilterPills />
        </View>
        <Racheta style={styles.svg} />
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
  },
  searchGroup: {
    width: '100%',
    gap: 8,
  },
  svg: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    zIndex: -1,
  },
});
