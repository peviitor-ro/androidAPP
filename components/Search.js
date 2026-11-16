import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useJobsInfiniteQuery } from '../landing/landing.queries';
import { useNavigation } from '@react-navigation/native';
import useJobStore from '../store/jobs.state';
import CustomButton from './Buttons';
import SearchIcon from '../assets/svg/SearchIcon';
import Dropdown from './Dropdown';
import { FilterButton } from '../features/filters/FilterButton';
import COLORS from '../constants/COLORS';

export default function Search({ ...props }) {
  const style = props.style || {};

  const navigation = useNavigation();
  const { jobs, search, setSearch, setJobs, cities, counties, remote } =
    useJobStore();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useJobsInfiniteQuery(search, cities, counties, remote);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleOnChange = (text) => {
    setSearch(text);
  };

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

  const uniqueJobs = Array.from(new Set(jobs.map((job) => job.job_title)));

  return (
    <View style={[defaultStyles.container, style.container]}>
      <View style={[defaultStyles.searchBox, style.searchBox]}>
        <SearchIcon style={[defaultStyles.icon, style.icon]} />
        <TextInput
          style={[defaultStyles.input, style.input]}
          placeholder="Caută un loc de muncă"
          placeholderTextColor="#7a8b8b"
          defaultValue={search}
          onChangeText={handleOnChange}
        />
        <CustomButton
          style={{
            button: [defaultStyles.searchButton, style.button],
            buttonText: [defaultStyles.searchButtonText, style.buttonText],
          }}
          title="Caută"
          onPress={() => navigation.navigate('Rezultate')}
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
        <Dropdown
          visible={visible}
          style={{ dropdown: [defaultStyles.dropdown, style.dropdown] }}
          onScroll={handleScroll}
        >
          {uniqueJobs.map((job, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSearch(job);
                navigation.navigate('Rezultate');
              }}
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor:
                    index % 2 === 0 ? COLORS.white : COLORS.border_grey,
                }}
              >
                <Text
                  style={[
                    defaultStyles.dropdownText,
                    style.dropdownText,
                    {
                      color:
                        index % 2 === 0
                          ? COLORS.background_green
                          : COLORS.white,
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {job}
                </Text>
              </View>
            </Pressable>
          ))}
          {isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              color={COLORS.background_green}
              style={{ marginBottom: 20 }}
            />
          ) : null}
        </Dropdown>
      )}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2ecea',
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 15,
    color: COLORS.background_green,
    textAlignVertical: 'center',
  },
  icon: {
    marginRight: 2,
  },
  searchButton: {
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  dropdown: {
    zIndex: 1,
    paddingBottom: 30,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicator: {
    marginTop: 10,
    position: 'absolute',
    left: '50%',
    top: '100%',
  },
});
