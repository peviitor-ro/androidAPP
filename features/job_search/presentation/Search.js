import React, { useState, useEffect } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
import { useJobsInfiniteQuery } from '../../landing/data/landing.queries';
import { useTabPager } from '../../../app/navigation/TabPagerContext';
import useJobStore from '../data/jobs.state';
import CustomButton from '../../../core/components/Buttons';
import SearchIcon from '../../../assets/svg/SearchIcon';
import { FilterButton } from '../../filters/FilterButton';
import COLORS from '../../../core/theme/COLORS';
import { SearchSuggestions } from './SearchSuggestions';
import { searchStyles as defaultStyles } from './Search.styles';

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function Search({ ...props }) {
  const style = props.style || {};

  const { navigateTo } = useTabPager();
  const { jobs, search, setSearch, setJobs, cities, counties, remote } =
    useJobStore();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useJobsInfiniteQuery(search, cities, counties, remote);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    switch (true) {
      case status === 'pending' && search !== '':
        setLoading(true);
        break;
      case status === 'success' &&
        search !== '' &&
        data.pages[0].results.length > 0:
        setJobs([...data.pages.map((page) => page.results).flat()]);
        setLoading(false);
        setVisible(true);
        break;
      default:
        setLoading(false);
        setVisible(false);
    }
  }, [search, cities, counties, remote, status, data]);

  const handleScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleSelectSuggestion = (job) => {
    setSearch(job);
    navigateTo('Rezultate');
  };

  const uniqueJobs = Array.from(new Set(jobs.map((job) => job.job_title)));

  return (
    <View
      style={[defaultStyles.container, style.container]}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <View style={[defaultStyles.searchBox, style.searchBox]}>
        <SearchIcon style={[defaultStyles.icon, style.icon]} />
        <TextInput
          style={[defaultStyles.input, style.input]}
          placeholder="Caută un loc de muncă"
          placeholderTextColor="#7a8b8b"
          defaultValue={search}
          onChangeText={setSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <CustomButton
          style={{
            button: [defaultStyles.searchButton, style.button],
            buttonText: [defaultStyles.searchButtonText, style.buttonText],
          }}
          title="Caută"
          onPress={() => navigateTo('Rezultate')}
        />
        <FilterButton />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.background_green}
          style={[defaultStyles.indicator, style.indicator]}
        />
      ) : (
        <SearchSuggestions
          visible={visible && isFocused}
          items={uniqueJobs}
          isFetchingNextPage={isFetchingNextPage}
          onSelect={handleSelectSuggestion}
          onScroll={handleScroll}
          style={{
            dropdown: [defaultStyles.dropdown, style.dropdown],
            dropdownContent: defaultStyles.dropdownContent,
            dropdownText: style.dropdownText,
          }}
        />
      )}
    </View>
  );
}
