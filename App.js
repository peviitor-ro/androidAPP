import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const height = Dimensions.get('window').height;
  return (
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
          <SafeAreaView style={styles.container}>
            <AppNavigator />
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </ScrollView>
    </LinearGradient>
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
