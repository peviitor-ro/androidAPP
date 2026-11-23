import React, { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons, MaterialIcons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import COLORS from '../../core/theme/COLORS';
import NoResults from '../../shared/components/NoResults';
import { FILTER_ITEMS } from './data/filterItems';
import { filterStyles } from './presentation/filter.styles';
import { useFilterSelection } from './presentation/useFilterSelection';

export function FilterButton() {
  const selectRef = useRef(null);
  const insets = useSafeAreaInsets();
  const { selectedFilterIds, applySelection } = useFilterSelection();

  const filterCount = selectedFilterIds.length;
  const bottomSpacing = Math.max(insets.bottom, 16);

  return (
    <>
      <Pressable
        style={filterStyles.filterButton}
        onPress={() => selectRef.current?._toggleSelector()}
        accessibilityLabel="Filtre"
      >
        <Ionicons
          name={filterCount > 0 ? 'funnel' : 'funnel-outline'}
          size={18}
          color={COLORS.background_green}
        />
        {filterCount > 0 && (
          <View style={filterStyles.badge}>
            <Text style={filterStyles.badgeText}>{filterCount}</Text>
          </View>
        )}
      </Pressable>

      <SectionedMultiSelect
        ref={selectRef}
        items={FILTER_ITEMS}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        readOnlyHeadings={true}
        showDropDowns={true}
        hideSelect={true}
        showChips={false}
        onSelectedItemsChange={applySelection}
        selectedItems={selectedFilterIds}
        modalWithSafeAreaView={true}
        confirmText="Confirmă"
        searchPlaceholderText="Caută..."
        parentChipText="Selectează"
        noResultsComponent={
          <View style={filterStyles.noResults}>
            <NoResults />
          </View>
        }
        styles={{
          button: [filterStyles.modalButton, { paddingTop: 12, paddingBottom: bottomSpacing }],
          cancelButton: [filterStyles.modalCancel, { paddingTop: 12, paddingBottom: bottomSpacing }],
          searchTextInput: filterStyles.searchTextInput,
          itemText: filterStyles.itemText,
        }}
      />
    </>
  );
}
