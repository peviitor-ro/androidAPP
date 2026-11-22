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
    paddingVertical: 2,
    gap: 8,
  },
  chipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    borderColor: '#dce6e5',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  chipText: {
    color: COLORS.background_green,
    fontSize: 13,
    fontWeight: '600',
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#eef6f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  badge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.background_green,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    includeFontPadding: false,
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
