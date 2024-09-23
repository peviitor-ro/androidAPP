import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useJobsInfiniteQuery } from '../landing/landing.queries';
import NoResults from './NoResults';
import Web from './Web';
import useJobStore from '../store/jobs.state';
import CustomButton from './Buttons';
import Map from '../assets/svg/Map';
import COLORS from '../constants/COLORS';
import NoImage from '../assets/svg/NoImage';

function typeTranslate(type) {
  const typesList = type.split(',');
  const types = typesList.map((type) => {
    switch (type.toLowerCase()) {
      case 'remote':
        return 'Remote';
      case 'hybrid':
        return 'Hibrid';
      case 'on-site':
        return 'La fața locului';
      default:
        return 'Necunoscut';
    }
  });
  return types.join(', ');
}

function refomatCity(city, county) {
  if (city.includes('all')) {
    return 'Tot Judetul ' + county;
  }
  return city;
}

export default function Card() {
  const { jobs, search, setJobs, cities, counties, remote } = useJobStore();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useJobsInfiniteQuery(search, cities, counties, remote);

  const [loading, setLoading] = useState();
  const [url, setUrl] = useState('');
  const [showWebView, setShowWebView] = useState(false);

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

  const handlePress = (index) => {
    setUrl(jobs[index].job_link);
    setShowWebView(true);
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
            jobs.map((job, index) => (
              <View key={index} style={styles.container}>
                {job.logo ? (
                  <Image source={{ uri: job.logo[0] }} style={styles.logo} />
                ) : (
                  <NoImage style={styles.noImage} />
                )}
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
                <View style={{ flex: 1, flexDirection: 'column', gap: 5 }}>
                  {job.city ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <Map />
                      <Text
                        style={styles.location}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {refomatCity(job.city, job.county)}
                      </Text>
                    </View>
                  ) : null}
                  {job.remote ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <Text
                        style={styles.location}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        Tipul Jobului: {typeTranslate(job.remote)}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <CustomButton
                  title="Aplică"
                  onPress={() => handlePress(index)}
                />
              </View>
            ))
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
    color: COLORS.background_green,
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
    backgroundColor: 'red',
  },
});
