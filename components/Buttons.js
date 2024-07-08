import { Text, Pressable, StyleSheet } from 'react-native';
import COLORS from '../constants/COLORS';

export default function CustomButton({ title, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? COLORS.button_pressed
            : COLORS.background_green,
        },
        styles.button,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.background_green,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});


