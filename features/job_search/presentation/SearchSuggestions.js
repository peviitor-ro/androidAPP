import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Dropdown from '../../../core/components/Dropdown';
import SearchIcon from '../../../assets/svg/SearchIcon';
import COLORS from '../../../core/theme/COLORS';

export function SearchSuggestions({
  visible,
  items,
  isFetchingNextPage,
  onSelect,
  onScroll,
  style = {},
}) {
  return (
    <Dropdown
      visible={visible}
      style={{
        dropdown: [style.dropdown],
        content: [style.dropdownContent],
      }}
      onScroll={onScroll}
    >
      {items.map((job, index) => {
        const isLast = index === items.length - 1;
        return (
          <Pressable
            key={`${job}-${index}`}
            onPress={() => onSelect(job)}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
              isLast && styles.itemLast,
            ]}
          >
            <View style={styles.iconBadge}>
              <SearchIcon width={14} height={14} />
            </View>
            <Text
              style={[styles.itemText, style.dropdownText]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {job}
            </Text>
          </Pressable>
        );
      })}
      {isFetchingNextPage ? (
        <ActivityIndicator
          size="small"
          color={COLORS.background_green}
          style={styles.footerLoader}
        />
      ) : null}
    </Dropdown>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#edf3f2',
  },
  itemPressed: {
    backgroundColor: '#eef6f5',
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#eef6f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1f3a38',
  },
  footerLoader: {
    paddingVertical: 12,
  },
});
