import { View, StyleSheet, ScrollView } from 'react-native';
import About from '../components/About';
import Search from '../components/Search';
import Racheta from '../assets/svg/Racheta';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <About jobs={10} />
        <Search />
        <Racheta style={styles.svg} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
  },
  svg:{
    width: 300,
    height: 300,
    alignSelf: 'center',
  }
});
