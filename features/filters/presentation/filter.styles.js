import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/COLORS';

export const filterStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  triggerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    borderColor: COLORS.background_green,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  triggerText: {
    color: COLORS.background_green,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background_green,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  selectedText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  noResults: {
    height: '100%',
  },
  modalButton: {
    backgroundColor: COLORS.background_green,
  },
  modalCancel: {
    backgroundColor: COLORS.border_grey,
  },
  searchTextInput: {
    color: COLORS.background_green,
  },
  itemText: {
    color: COLORS.background_green,
  },
});
