import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Results from '../screens/Results';
import Header from '../components/Header';
import Filter from '../components/Filters';
import Saved from '../screens/Saved';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f6f0ec',
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Acasă') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rezultate') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Filtre') {
            iconName = focused ? 'filter' : 'filter-outline';
          } else if (route.name === 'Salvate') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Acasă" component={Home} />
      <Tab.Screen name="Rezultate" component={Results} />
      <Tab.Screen name="Filtre" component={Filter} />
      <Tab.Screen name="Salvate" component={Saved} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Header />
        <Stack.Navigator
          initialRouteName="Acasă"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
