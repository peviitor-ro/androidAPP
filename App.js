import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppNavigator from './navigation/AppNavigator';

const cover = require('./assets/images/cover.png');

export default function App() {
  const height = Dimensions.get('window').height;
  return (
    <ImageBackground source={cover} style={styles.container} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}
        enableOnAndroid={true}
        extraScrollHeight={-height}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <AppNavigator />
        </SafeAreaView>
      </KeyboardAwareScrollView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
