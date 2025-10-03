import {
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './navigation/AppNavigator';
import { JobProvider } from './context/JobContext';

export default function App() {
  const height = Dimensions.get('window').height;
  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#d0e7f2', '#f6f0ec']} style={styles.container}>
        <StatusBar backgroundColor="#d0e7f2" barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewContainer}
            enableOnAndroid={true}
            extraScrollHeight={-height}
            keyboardShouldPersistTaps="handled"
            enableAutomaticScroll
            style={styles.container}
          >
            <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
              <JobProvider>
                <AppNavigator />
              </JobProvider>
            </SafeAreaView>
          </KeyboardAwareScrollView>
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
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
