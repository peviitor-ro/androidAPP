import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, Pressable, ScrollView, Text } from 'react-native';
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

const mergeChips = (prev, next, nextIds) => {
  const result = [...next];
  prev.forEach((chip, idx) => {
    if (nextIds.has(chip.id)) return;
    result.splice(Math.min(idx, result.length), 0, chip);
  });
  return result;
};

function AnimatedChip({ chip, isExiting, onRemove, onExited }) {
  const [anim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!isExiting) {
      Animated.spring(anim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(anim, {
      toValue: 0,
      duration: 140,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onExited(chip.id);
    });
  }, [anim, isExiting, chip.id, onExited]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.75, 1] });

  return (
    <Animated.View style={[filterStyles.chipPill, { opacity: anim, transform: [{ scale }] }]}>
      <Ionicons name={getChipIcon(chip)} size={15} color={COLORS.background_green} />
      <Text style={filterStyles.chipText}>{chip.name}</Text>
      <Pressable hitSlop={6} disabled={isExiting} onPress={() => onRemove(chip.id)}>
        <Ionicons name="close" size={15} color={COLORS.background_green} />
      </Pressable>
    </Animated.View>
  );
}

export function FilterPills({ style }) {
  const { selectedFilterIds, applySelection } = useFilterSelection();

  const activeChips = useMemo(() => {
    const { jobTypeChips, cityChips } = splitFilterChips(selectedFilterIds);
    return [...jobTypeChips, ...cityChips];
  }, [selectedFilterIds]);

  const activeIds = useMemo(() => new Set(activeChips.map((c) => c.id)), [activeChips]);
  const [renderedChips, setRenderedChips] = useState(activeChips);
  const [prevKey, setPrevKey] = useState(() => selectedFilterIds.join(','));

  const currentKey = selectedFilterIds.join(',');
  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    setRenderedChips(mergeChips(renderedChips, activeChips, activeIds));
  }

  const hasVisibleChips = renderedChips.length > 0;
  const [barAnim] = useState(() => new Animated.Value(hasVisibleChips ? 1 : 0));

  useEffect(() => {
    Animated.timing(barAnim, {
      toValue: hasVisibleChips ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [barAnim, hasVisibleChips]);

  const handleRemove = (id) => {
    applySelection(selectedFilterIds.filter((item) => item !== id));
  };

  const handleExited = useCallback((id) => {
    setRenderedChips((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const barStyle = {
    height: barAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 44] }),
    opacity: barAnim,
  };

  return (
    <Animated.View style={[filterStyles.wrapper, style, barStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={filterStyles.pillsRow}
      >
        {renderedChips.map((chip) => (
          <AnimatedChip
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
