import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../core/theme/COLORS';
import { splitFilterChips } from './domain/extractFilters';
import { filterStyles } from './presentation/filter.styles';
import { useFilterSelection } from './presentation/useFilterSelection';

const JOB_TYPE_ICONS = {
  'on-site': 'business-outline',
  hybrid: 'layers-outline',
  remote: 'laptop-outline',
};

const getChipIcon = (chip) =>
  chip.groupId === 0 ? 'location-outline' : JOB_TYPE_ICONS[chip.type] ?? 'pricetag-outline';

export function FilterPills({ style }) {
  const { selectedFilterIds, applySelection } = useFilterSelection();

  const { jobTypeChips, cityChips } = useMemo(
    () => splitFilterChips(selectedFilterIds),
    [selectedFilterIds],
  );

  const chips = [...jobTypeChips, ...cityChips];

  return (
    <View style={[filterStyles.wrapper, style]}>
      {chips.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={filterStyles.pillsRow}
        >
          {chips.map((chip) => (
            <View key={chip.id} style={filterStyles.chipPill}>
              <Ionicons name={getChipIcon(chip)} size={15} color={COLORS.background_green} />
              <Text style={filterStyles.chipText}>{chip.name}</Text>
              <Pressable
                hitSlop={6}
                onPress={() => applySelection(selectedFilterIds.filter((id) => id !== chip.id))}
              >
                <Ionicons name="close" size={15} color={COLORS.background_green} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
