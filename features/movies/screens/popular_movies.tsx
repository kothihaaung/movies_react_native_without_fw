import React, { Suspense } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import MovieList from "../components/MovieList";
import HelloTitle from "../components/HelloTitle";

const MovieListLoading = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  </SafeAreaView>
);

const PopularMoviesScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HelloTitle name="Junior Pitchayut Chitsinpchayakun" />
      <Suspense fallback={<MovieListLoading />}>
        <MovieList />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 16, // Padding at the top of the safe area
    backgroundColor: "#000",
  },
  gridItem: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 0,
    borderRadius: 10,
  },
  movieContainer: {
    flex: 1,
    margin: 8, // Margin around each movie item
    alignItems: "center",
  },
  poster: {
    width: 160,
    height: 225,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: "white",
    marginTop: 8,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  appTitle: {
    fontSize: 24,
    color: "white",
  },
  appTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 4,
  },
});

export default PopularMoviesScreen;
