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
  const { selectedFilterIds, applySelection, clearSelection } = useFilterSelection();

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
        hideConfirm={true}
        searchPlaceholderText="Caută..."
        parentChipText="Selectează"
        stickyFooterComponent={
          <View style={[filterStyles.footerRow, { paddingBottom: bottomSpacing }]}>
            {filterCount > 0 && (
              <Pressable
                onPress={() => clearSelection(selectRef)}
                style={filterStyles.clearButton}
              >
                <Ionicons name="trash-outline" size={18} color={COLORS.background_green} />
                <Text style={filterStyles.clearButtonText}>Șterge</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => selectRef.current?._submitSelection()}
              style={filterStyles.confirmButton}
            >
              <Text style={filterStyles.confirmButtonText}>Confirmă</Text>
            </Pressable>
          </View>
        }
        colors={{
          primary: COLORS.background_green,
          text: '#1f2937',
          subText: '#374151',
        }}
        noResultsComponent={
          <View style={filterStyles.noResults}>
            <NoResults />
          </View>
        }
        styles={{
          container: filterStyles.modalContainer,
          searchBar: filterStyles.searchBar,
          searchTextInput: filterStyles.searchTextInput,
          item: filterStyles.modalItem,
          itemText: filterStyles.itemText,
          subItem: filterStyles.modalSubItem,
          selectedSubItem: filterStyles.modalSelectedSubItem,
          subItemText: filterStyles.subItemText,
          selectedSubItemText: filterStyles.selectedSubItemText,
          separator: filterStyles.modalSeparator,
          button: [filterStyles.modalButton, { marginBottom: bottomSpacing }],
          cancelButton: [filterStyles.modalCancel, { marginBottom: bottomSpacing }],
          confirmText: filterStyles.confirmText,
        }}
      />
    </>
  );
}
