import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import COLORS from '../constants/COLORS';
import NoImage from '../assets/svg/NoImage';
import Map from '../assets/svg/Map';
import Heart from '../assets/svg/Heart';
import CustomButton from './Buttons';

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
  heart: {
    margin: 10,
  },
});

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

export default function Card(job) {
  const { logo, company_name, job_title, city, county, remote, job_link } = job.job;
  return (
    <View style={styles.container}>
      {logo ? (
        <Image source={{ uri: logo[0] }} style={styles.logo} />
      ) : (
        <NoImage style={styles.noImage} />
      )}
      <View style=  {{ flex: 1 }}>
        <Text style={styles.company} numberOfLines={1} ellipsizeMode="tail">
          {company_name}
        </Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {job_title}
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'column', gap: 5 }}>
        {city ? (
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
              {refomatCity(city, county)}
            </Text>
          </View>
        ) : null}
        {remote ? (
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
              Tipul Jobului: {typeTranslate(remote)}
            </Text>
          </View>
        ) : null}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
        >
          <TouchableOpacity>
            <Heart style={styles.heart} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        title="Aplică"
        onPress={() => WebBrowser.openBrowserAsync(job_link)}
      />
    </View>
  );
}

