import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './navigation/AppNavigator';
import { JobProvider } from './context/JobContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#d0e7f2', '#f6f0ec']} style={styles.container}>
        <StatusBar backgroundColor="#d0e7f2" barStyle="dark-content" />
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
          <JobProvider>
            <AppNavigator />
          </JobProvider>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
