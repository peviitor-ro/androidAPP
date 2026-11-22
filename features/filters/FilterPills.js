import React, { useMemo } from 'react';
import { Animated, ScrollView } from 'react-native';
import { useAnimatedList } from '../../core/animations/useAnimatedList';
import { useToggleAnimation } from '../../core/animations/useToggleAnimation';
import { splitFilterChips } from './domain/extractFilters';
import { filterStyles } from './presentation/filter.styles';
import { FilterChip } from './presentation/FilterChip';
import { useFilterSelection } from './presentation/useFilterSelection';

export function FilterPills({ style }) {
  const { selectedFilterIds, applySelection } = useFilterSelection();

  const activeChips = useMemo(() => {
    const { jobTypeChips, cityChips } = splitFilterChips(selectedFilterIds);
    return [...jobTypeChips, ...cityChips];
  }, [selectedFilterIds]);

  const { renderedItems, activeIds, handleExited } = useAnimatedList(
    activeChips,
    selectedFilterIds.join(','),
  );

  const barAnim = useToggleAnimation(renderedItems.length > 0);
  const barStyle = {
    maxHeight: barAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 64] }),
    opacity: barAnim,
  };

  const handleRemove = (id) => {
    applySelection(selectedFilterIds.filter((item) => item !== id));
  };

  return (
    <Animated.View style={[filterStyles.wrapper, style, barStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={filterStyles.pillsRow}
      >
        {renderedItems.map((chip) => (
          <FilterChip
            key={chip.id}
            chip={chip}
            isExiting={!activeIds.has(chip.id)}
            onRemove={handleRemove}
            onExited={handleExited}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
}
