import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
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
  const [clearAnim] = useState(() => new Animated.Value(filterCount > 0 ? 1 : 0));
  const [iconScale] = useState(() => new Animated.Value(1));
  const [badgeScale] = useState(() => new Animated.Value(filterCount > 0 ? 1 : 0));
  const prevCountRef = useRef(filterCount);

  useEffect(() => {
    Animated.timing(clearAnim, {
      toValue: filterCount > 0 ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();

    if (prevCountRef.current !== filterCount) {
      prevCountRef.current = filterCount;
      Animated.sequence([
        Animated.timing(iconScale, { toValue: 1.24, duration: 110, useNativeDriver: true }),
        Animated.spring(iconScale, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
      Animated.spring(badgeScale, {
        toValue: filterCount > 0 ? 1 : 0,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [clearAnim, iconScale, badgeScale, filterCount]);

  const clearAnimatedStyle = {
    width: clearAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 108] }),
    marginRight: clearAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 10] }),
    opacity: clearAnim,
  };

  return (
    <>
      <Pressable
        style={[filterStyles.filterButton, filterCount > 0 && filterStyles.filterButtonActive]}
        onPress={() => selectRef.current?._toggleSelector()}
        accessibilityLabel="Filtre"
      >
        <Animated.View style={{ transform: [{ scale: iconScale }] }}>
          <Ionicons
            name={filterCount > 0 ? 'funnel' : 'funnel-outline'}
            size={18}
            color={COLORS.background_green}
          />
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={[filterStyles.badge, { transform: [{ scale: badgeScale }] }]}
        >
          <Text style={filterStyles.badgeText}>{filterCount}</Text>
        </Animated.View>
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
            <Animated.View style={[filterStyles.clearWrapper, clearAnimatedStyle]}>
              <Pressable
                onPress={() => clearSelection(selectRef)}
                disabled={filterCount === 0}
                style={filterStyles.clearButton}
              >
                <Ionicons name="trash-outline" size={18} color={COLORS.background_green} />
                <Text numberOfLines={1} style={filterStyles.clearButtonText}>
                  Șterge
                </Text>
              </Pressable>
            </Animated.View>
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
