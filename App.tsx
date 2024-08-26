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
import WelcomeToReactNative from './features/feature/welcome/welcome_react_native_screen';

// Example screens
function ScreenA() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function ScreenB() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

// Data for dynamic tabs
const tabsData = [
  { name: 'Popular', component: ScreenA, icon: 'film-outline' },
  { name: 'Welcome', component: WelcomeToReactNative, icon: 'list' },
];

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
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
  );
}

const styles = StyleSheet.create({
  
});

export default App;
