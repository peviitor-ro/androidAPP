import React, { useCallback } from 'react';
import { Animated, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnimatedPresence } from '../../../core/animations/useAnimatedPresence';
import COLORS from '../../../core/theme/COLORS';
import { filterStyles } from './filter.styles';

const JOB_TYPE_ICONS = {
  'on-site': 'business-outline',
  hybrid: 'layers-outline',
  remote: 'laptop-outline',
};

const getChipIcon = (chip) =>
  chip.groupId === 0 ? 'location-outline' : JOB_TYPE_ICONS[chip.type] ?? 'pricetag-outline';

export function FilterChip({ chip, isExiting, onRemove, onExited }) {
  const handleExited = useCallback(() => onExited(chip.id), [chip.id, onExited]);
  const animatedStyle = useAnimatedPresence(isExiting, handleExited);

  return (
    <Animated.View style={[filterStyles.chipPill, animatedStyle]}>
      <Ionicons name={getChipIcon(chip)} size={15} color={COLORS.background_green} />
      <Text style={filterStyles.chipText}>{chip.name}</Text>
      <Pressable hitSlop={6} disabled={isExiting} onPress={() => onRemove(chip.id)}>
        <Ionicons name="close" size={15} color={COLORS.background_green} />
      </Pressable>
    </Animated.View>
  );
}
