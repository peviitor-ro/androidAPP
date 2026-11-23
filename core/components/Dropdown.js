import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import COLORS from '../theme/COLORS';

const defaultStyle = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border_grey,
    maxHeight: 200,
    marginTop: 10,
  },
  conntentStyle: {
    gap: 5,
  },
});

export default function Dropdown({ ...props }) {
  const { visible, children, onScroll } = props;

  if (!visible) return null;

  const style = props.style || {};

  return (
    <ScrollView
      contentContainerStyle={[defaultStyle.conntentStyle, style.content]}
      style={[defaultStyle.dropdown, style.dropdown]}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      onScroll={onScroll}
    >
      {children}
    </ScrollView>
  );
}
