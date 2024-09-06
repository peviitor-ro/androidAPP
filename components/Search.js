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
import COLORS from '../constants/COLORS';

export default function Search({ ...props }) {
  const style = props.style || {};

  const navigation = useNavigation();
  const { jobs, search, setSearch, setJobs } = useJobStore();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useJobsInfiniteQuery(search);

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
  }, [search, status, data]);

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
      <View style={[defaultStyles.inputContainer, style.inputContainer]}>
        <SearchIcon style={[defaultStyles.icon, style.icon]} />
        <TextInput
          style={[defaultStyles.input, style.input]}
          placeholder="Caută un loc de muncă"
          defaultValue={search}
          onChangeText={handleOnChange}
        />
      </View>
      <CustomButton
        style={style}
        title="Caută"
        onPress={() => navigation.navigate('Results')}
      />
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
                navigation.navigate('Results');
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
    gap: 10,
    marginHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border_grey,
    borderRadius: 5,
    paddingLeft: 40,
    width: '100%',
    backgroundColor: COLORS.white,
    color: COLORS.background_green,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
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
