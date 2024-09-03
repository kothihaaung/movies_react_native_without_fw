/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "react-native-devsettings";
import React from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeToReactNative from "./features/welcome/screens/welcome_react_native_screen";
import PopularMoviesScreen from "./features/movies/screens/popular_movies";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetailScreen from "./features/movies/screens/movie_detail";
import { Movie } from "./features/movies/movie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const queryClient = new QueryClient();

// Data for dynamic tabs
const tabsData = [
  { name: "Popular", component: PopularMoviesScreen, icon: "film-outline" },
  { name: "Welcome", component: WelcomeToReactNative, icon: "list" },
];

type RootStackParamList = {
  Tabs: undefined;
  MovieDetail: { item: Movie };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const initialMovie: Movie = {
  id: 0,
  title: "",
  overview: "",
  poster_path: "",
};

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen
              name="MovieDetail"
              component={MovieDetailScreen}
              initialParams={{ item: initialMovie }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all tabs
        tabBarStyle: { borderTopWidth: 0, backgroundColor: "#1c1c1c" }, // Set background color to black
        tabBarActiveTintColor: "#fff", // Set active icon and label color to white
        tabBarInactiveTintColor: "#888", // Set inactive icon and label color to grey
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
              <Ionicons name={tab.icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
