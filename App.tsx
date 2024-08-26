/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
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
import { store } from './store';

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
      <Tab.Navigator>
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
  
});

export default App;
