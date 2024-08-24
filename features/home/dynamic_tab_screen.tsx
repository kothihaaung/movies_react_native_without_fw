import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

function ScreenC() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>More</Text>
    </View>
  );
}

// Data for dynamic tabs
const tabsData = [
  { name: 'TabA', component: ScreenA, icon: 'home' },
  { name: 'TabB', component: ScreenB, icon: 'list' },
  { name: 'TabC', component: ScreenC, icon: 'settings' },
];

const Tab = createBottomTabNavigator();

export default function DynamicTabScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ color, size }) => {
        //     const tab: any = tabsData.find(tab => tab.name === route.name);
        //     return <Ionicons name={tab.icon} color={color} size={size} />;
        //   },
        // })}
      >
        {tabsData.map((tab, index) => (
          <Tab.Screen key={index} name={tab.name} component={tab.component} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}