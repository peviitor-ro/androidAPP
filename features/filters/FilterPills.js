import React, { useMemo } from 'react';
import { Animated, ScrollView } from 'react-native';
import { useTabPager } from '../../app/navigation/TabPagerContext';
import { useAnimatedList } from '../../core/animations/useAnimatedList';
import { useToggleAnimation } from '../../core/animations/useToggleAnimation';
import { splitFilterChips } from './domain/extractFilters';
import { filterStyles } from './presentation/filter.styles';
import { FilterChip } from './presentation/FilterChip';
import { useFilterSelection } from './presentation/useFilterSelection';

export function FilterPills({ style }) {
  const { selectedFilterIds, applySelection } = useFilterSelection();
  const { setPagerScrollEnabled } = useTabPager();

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
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={filterStyles.pillsRow}
        onTouchStart={() => setPagerScrollEnabled(false)}
        onTouchEnd={() => setPagerScrollEnabled(true)}
        onTouchCancel={() => setPagerScrollEnabled(true)}
        onScrollEndDrag={() => setPagerScrollEnabled(true)}
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
