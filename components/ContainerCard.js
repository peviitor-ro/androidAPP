import { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useJobsInfiniteQuery } from '../landing/landing.queries';
import NoResults from './NoResults';
import useJobStore from '../store/jobs.state';
import COLORS from '../constants/COLORS';
import Card from './Card';

export default function ContainerCard() {
  const { jobs, search, setJobs, cities, counties, remote } = useJobStore();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useJobsInfiniteQuery(search, cities, counties, remote);

  const [loading, setLoading] = useState();

  useEffect(() => {
    switch (true) {
      case status === 'pending':
        setLoading(true);
        break;
      case status === 'success' && data.pages[0].results.length > 0:
        setJobs([...data.pages.map((page) => page.results).flat()]);
        setLoading(false);
        break;
      default:
        setLoading(false);
    }
  }, [search, cities, counties, remote, status, data]);

  const handleScroll = ({ nativeEvent }) => {
    const isScrolledToEnd = isCloseToBottom(nativeEvent);
    if (isScrolledToEnd && hasNextPage && !isFetchingNextPage) {
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

  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        zIndex: -1,
        borderTopWidth: 1,
        borderColor: COLORS.background_green,
      }}
    >
      <View style={{ flexGrow: 1, justifyContent: 'center', zIndex: -1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 100,
          }}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          onScroll={handleScroll}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.background_green}
              style={{
                marginTop: 50,
              }}
            />
          ) : data?.pages[0].results.length > 0 ? (
            jobs.map((job, index) => <Card key={index} job={job} />)
          ) : (
            <NoResults />
          )}

          {isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              color={COLORS.background_green}
              style={{
                width: '100%',
              }}
            />
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}
