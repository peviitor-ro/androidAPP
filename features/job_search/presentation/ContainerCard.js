import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useJobsInfiniteQuery } from '../../landing/data/landing.queries';
import NoResults from '../../../shared/components/NoResults';
import ServerDown from '../../../shared/components/ServerDown';
import useJobStore from '../data/jobs.state';
import COLORS from '../../../core/theme/COLORS';
import JobList from '../../jobs/JobList';

export default function ContainerCard() {
  const { jobs, search, setJobs, cities, counties, remote } = useJobStore();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useJobsInfiniteQuery(search, cities, counties, remote);

  useEffect(() => {
    if (status === 'success') {
      setJobs(data.pages.flatMap((page) => page.results));
    }
  }, [status, data, setJobs]);

  return (
    <View style={styles.container}>
      <JobList
        key={JSON.stringify([search, cities, counties, remote])}
        data={status === 'success' ? jobs : []}
        contentContainerStyle={styles.content}
        nestedScrollEnabled
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && status === 'success') {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          status === 'pending' ? (
            <ActivityIndicator
              size="large"
              color={COLORS.background_green}
              style={styles.loading}
            />
          ) : isError ? (
            <ServerDown />
          ) : (
            <NoResults />
          )
        }
        ListFooterComponent={
          isFetchingNextPage && jobs.length > 0 ? (
            <ActivityIndicator
              size="small"
              color={COLORS.background_green}
              style={styles.footer}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.background_green,
  },
  content: {
    justifyContent: 'center',
    paddingBottom: 100,
  },
  loading: {
    marginTop: 50,
  },
  footer: {
    width: '100%',
    padding: 16,
  },
});
