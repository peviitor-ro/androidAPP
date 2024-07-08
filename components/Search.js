import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from './Buttons';
import SearchIcon from '../assets/svg/SearchIcon';

import COLORS from '../constants/COLORS';

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchIcon style={styles.icon}/>
        <TextInput style={styles.input} placeholder="Caută un loc de muncă" />
      </View>
      <CustomButton title="Caută" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border_grey,
    borderRadius: 5,
    paddingLeft: 40,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 10
  },
});
