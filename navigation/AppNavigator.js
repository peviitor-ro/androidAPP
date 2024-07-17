import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '../screens/Home';
import Results from '../screens/Results';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function AppNavigator() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Header />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Results" component={Results} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
