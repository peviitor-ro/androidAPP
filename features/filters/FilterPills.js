import React, { useMemo, useRef } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons, MaterialIcons as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import COLORS from '../../constants/COLORS';
import NoResults from '../../components/NoResults';
import useJobStore from '../../store/jobs.state';
import { FILTER_ITEMS } from './data/filterItems';
import { extractFilters, splitFilterChips } from './domain/extractFilters';
import { filterStyles } from './presentation/filter.styles';

export function FilterPills({ style }) {
  const selectRef = useRef(null);
  const insets = useSafeAreaInsets();
  const { selectedFilterIds, setSelectedFilterIds, setCities, setCounties, setRemote } =
    useJobStore();

  const { jobTypeChips, cityChips } = useMemo(
    () => splitFilterChips(selectedFilterIds),
    [selectedFilterIds],
  );

  const applySelection = (nextIds) => {
    setSelectedFilterIds(nextIds);
    const { cities, counties, remote } = extractFilters(nextIds);
    setCities(cities);
    setCounties(counties);
    setRemote(remote);
  };

  const bottomSpacing = Math.max(insets.bottom, 16);

  return (
    <View style={[filterStyles.wrapper, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={filterStyles.pillsRow}
      >
        <Pressable
          style={filterStyles.triggerPill}
          onPress={() => selectRef.current?._toggleSelector()}
        >
          <Ionicons name="location-outline" size={16} color={COLORS.background_green} />
          <Text style={filterStyles.triggerText}>Locația</Text>
        </Pressable>

        {[...jobTypeChips, ...cityChips].map((chip) => (
          <View key={chip.id} style={filterStyles.selectedPill}>
            <Text style={filterStyles.selectedText}>{chip.name}</Text>
            <Pressable
              hitSlop={6}
              onPress={() => applySelection(selectedFilterIds.filter((id) => id !== chip.id))}
            >
              <Ionicons name="close" size={16} color={COLORS.white} />
            </Pressable>
          </View>
        ))}
      </ScrollView>

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
    </View>
  );
}
