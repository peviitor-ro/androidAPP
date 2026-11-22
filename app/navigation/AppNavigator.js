import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '../../features/landing/Home';
import Results from '../../features/job_search/Results';
import Header from '../../shared/components/Header';
import Saved from '../../features/jobs/Saved';
import { BottomBar } from '../../shared/components/BottomBar';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState('Acasă');

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={() => {
          const name = navigationRef.getCurrentRoute()?.name;
          if (name) setCurrentRoute(name);
        }}
      >
        <View style={styles.container}>
          <Stack.Navigator
            initialRouteName="Acasă"
            screenOptions={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: true,
              headerTitle: () => <Header />,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#d0e7f2' },
              headerShadowVisible: false,
              headerLeft: () => null,
              gestureEnabled: true,
            }}
          >
            <Stack.Screen name="Acasă" component={Home} />
            <Stack.Screen name="Rezultate" component={Results} />
            <Stack.Screen name="Salvate" component={Saved} />
          </Stack.Navigator>
          <BottomBar
            currentRoute={currentRoute}
            onSelect={(name) => navigationRef.navigate(name)}
          />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
