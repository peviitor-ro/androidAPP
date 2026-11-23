import { StyleSheet, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigator from './app/navigation/AppNavigator';
import { JobProvider } from './features/jobs/data/JobContext';
import { ToastProvider } from './core/components/Toast';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <LinearGradient colors={['#d0e7f2', '#f6f0ec']} style={styles.container}>
          <StatusBar backgroundColor="#d0e7f2" barStyle="dark-content" />
          <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <JobProvider>
              <ToastProvider>
                <AppNavigator />
              </ToastProvider>
            </JobProvider>
          </SafeAreaView>
        </LinearGradient>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
