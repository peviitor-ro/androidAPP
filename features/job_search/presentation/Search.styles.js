import { StyleSheet } from 'react-native';
import COLORS from '../../../core/theme/COLORS';

export const searchStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 20,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2ecea',
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 15,
    color: COLORS.background_green,
    textAlignVertical: 'center',
  },
  icon: {
    marginRight: 2,
  },
  searchButton: {
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  dropdown: {
    zIndex: 10,
    marginTop: 8,
    borderRadius: 16,
    borderColor: '#e2ecea',
    backgroundColor: COLORS.white,
    maxHeight: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  dropdownContent: {
    gap: 0,
    paddingVertical: 4,
  },
  indicator: {
    marginTop: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: '100%',
  },
});
