import {
  View,
  StyleSheet,
} from 'react-native';
import Search from '../components/Search';
import COLORS from '../constants/COLORS';
import Card from '../components/Card';

export default function Results() {

  return (
    <View style={styles.container} >
      <Search style={searchStyles} />
      <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
});

const searchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 0,
    zIndex: 1,
  },
  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    height: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
  },
  icon: {
    position: 'absolute',
    left: 10,
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
