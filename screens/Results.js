import { View, StyleSheet } from 'react-native';
import Search from '../components/Search';
import { FilterPills } from '../features/filters/FilterPills';
import COLORS from '../constants/COLORS';
import Card from '../components/ContainerCard';
import Background from '../components/Background';

export default function Results() {
  return (
    <Background>
      <View style={styles.container}>
        <Search style={searchStyles} />
        <FilterPills style={styles.filterPills} />
        <Card />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: -1,
  },
  filterText: {
    color: COLORS.background_green,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  svg: {
    width: 100,
    height: 10,
    color: COLORS.background_green,
  },
  filterPills: {
    marginBottom: 12,
  },
});

const searchStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
    zIndex: 1,
  },
  dropdown: {
    flex: 0,
    display: 'none',
  },
  indicator: {
    flex: 0,
    display: 'none',
  },
});
