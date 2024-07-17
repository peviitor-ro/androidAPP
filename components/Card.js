import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useJobsInfiniteQuery } from '../landing/landing.queries';
import Web from './Web';
import { useEffect, useState } from 'react';
import useJobStore from '../store/jobs.state';
import CustomButton from './Buttons';
import Map from '../assets/svg/Map';
import COLORS from '../constants/COLORS';
import NoImage from '../assets/svg/NoImage';

export default function Card() {
  const { jobs, search, setJobs } = useJobStore();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useJobsInfiniteQuery(search);

  const [loading, setLoading] = useState();
  const [url, setUrl] = useState('');
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    switch (true) {
      case status === 'pending' :
        setLoading(true);
        break;
      case status === 'success' &&
        data.pages[0].results.length > 0:
        setJobs([...data.pages.map((page) => page.results).flat()]);
        setLoading(false);
        break;
      default:
        setLoading(false);
    }
  }, [search, status, data]);

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

  const handlePress = (index) => {
    setUrl(jobs[index].job_link);
    setShowWebView(true);
  }
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
      <View style={{ flex: 1, justifyContent: 'center', zIndex: -1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
          ) : (
            jobs.map((job, index) => (
              <View key={index} style={styles.container}>
                {
                  job.logo[0] ? (
                    <Image source={{ uri: job.logo[0] }} style={styles.logo} />
                  ) : (
                    <NoImage style={styles.noImage} />
                  )
                }
                <View style={{ flex: 1 }}>
                  <Text
                    style={styles.company}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {job.company_name}
                  </Text>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {job.job_title}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Map />
                  <Text
                    style={styles.location}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {job.city}
                  </Text>
                </View>
                <CustomButton
                  title="Aplică"
                  onPress={() => handlePress(index)}
                />
              </View>
            ))
          )}
          {isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              color={COLORS.background_green}
              style={{
                marginBottom: 20,
              }}
            />
          ) : null}
        </ScrollView>
      </View>
      <Web url={url} visible={showWebView} setVisible={setShowWebView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 300,
    width: 300,
    justifyContent: 'space-evenly',
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
  },
  company: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
  },
  noImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: "red",
  },
});
