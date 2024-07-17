import { Text, Pressable, StyleSheet } from 'react-native';
import COLORS from '../constants/COLORS';

const defaultStyles = StyleSheet.create({
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

export default function CustomButton({ ...props }) {
  const { title, onPress } = props;
  const style = props.style || {};

  return (
    <Pressable style={[defaultStyles.button, style.button]} onPress={onPress}>
      <Text style={[defaultStyles.buttonText, style.buttonText]}>{title}</Text>
    </Pressable>
  );
}
