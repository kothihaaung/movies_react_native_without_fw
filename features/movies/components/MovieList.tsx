import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Movie } from "../movie";
import { useNavigation } from "@react-navigation/native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../apis/tmdb";

const MovieList: React.FC = () => {
  const navigation = useNavigation();
  const { data } = useSuspenseQuery({
    queryKey: ["popular_movies"],
    queryFn: getPopularMovies,
  });
  // OnPress
  // navigate for detail screen
  const handlePress = (item: Movie) => {
    navigation.navigate("MovieDetail", { item: item });
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item)}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMovieItem}
      numColumns={2} // Set number of columns in grid
      columnWrapperStyle={styles.columnWrapper} // Style for spacing between columns
    />
  );
};

const styles = StyleSheet.create({
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
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default MovieList;
