/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WelcomeToReactNative from './features/welcome/screens/welcome_react_native_screen';
import PopularMoviesScreen from './features/movies/screens/popular_movies';
import { Provider } from 'react-redux';
import { store } from './features/store';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Data for dynamic tabs
const tabsData = [
  { name: 'Popular', component: PopularMoviesScreen, icon: 'film-outline' },
  { name: 'Welcome', component: WelcomeToReactNative, icon: 'list' },
];

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#1a1919',
              borderTopWidth: 0,
            }, // Set background color to black
            tabBarActiveTintColor: '#fff', // Set active icon and label color to white
            tabBarInactiveTintColor: '#888', // Set inactive icon and label color to grey
          }}
        >
          {tabsData.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarLabel: tab.name,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }} />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBackgroundColor,
    borderTopWidth: 0
  }
});

export default App;
