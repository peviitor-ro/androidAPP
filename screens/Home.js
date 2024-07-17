import { StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { total } from '../services/landing/landing.service';
import About from '../components/About';
import Search from '../components/Search';
import Racheta from '../assets/svg/Racheta';

export default function Home() {
  const [jobs, setJobs] = useState(0);

  useEffect(() => {
    total().then((res) => setJobs(res.total));
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    style={styles.scrollView}>
        <About jobs={jobs} />
        <Search />
        <Racheta style={styles.svg} />
    </ScrollView>
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
  svg: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    zIndex: -1,
  },
});
