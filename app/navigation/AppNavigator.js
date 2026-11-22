import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '../../shared/components/Header';
import { TabPagerProvider } from './TabPagerContext';
import { MainTabsPager } from './MainTabsPager';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function AppNavigator() {
  return (
    <QueryClientProvider client={queryClient}>
      <TabPagerProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MainTabs"
            screenOptions={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: true,
              headerTitle: () => <Header />,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#d0e7f2' },
              headerShadowVisible: false,
              gestureEnabled: true,
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabsPager} />
          </Stack.Navigator>
        </NavigationContainer>
      </TabPagerProvider>
    </QueryClientProvider>
  );
}
