import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure } from '../movies_action';
import { Movie } from '../movie';

// Type for the Redux state
interface MoviesState {
    movies: {
        movies: Movie[];
        loading: boolean;
        error: string | null;
    };
}

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGYzZWQ3YjA0NjY1NWM0NzRmMzM5OGFhYjQxMjY3ZCIsIm5iZiI6MTcyNDIxMDQ2NC4zMDc4OCwic3ViIjoiNjA0YWUwMTY5MGI4N2UwMDU4ZWU0YTQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Hcayqbgrx070hgnacNfTfgaFyirzFyq4OVmwMONV-1w';

const PopularMoviesScreen = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state: MoviesState) => state.movies);

    useEffect(() => {
        const fetchMovies = async () => {
            dispatch(fetchMoviesRequest());
            try {
                const response = await fetch(
                    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
                    {
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`, // Replace with your actual access token
                        },
                    }
                );

                const data = await response.json();
                dispatch(fetchMoviesSuccess(data.results));

            } catch (error) {
                dispatch(fetchMoviesFailure('Error fetching data'));
            }
        };

        fetchMovies();

    }, [dispatch]);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item)}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
            />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    const handlePress = (item: Movie) => {
        // router.push({
        //     pathname: '/features/movies/screens/movie_detail',
        //     params: { item: JSON.stringify(item) }, // Or any unique identifier
        // });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2} // Set number of columns in grid
                columnWrapperStyle={styles.columnWrapper} // Style for spacing between columns
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 16, // Padding at the top of the safe area
        backgroundColor: '#000',
    },
    gridItem: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 0,
        borderRadius: 10,
    },
    movieContainer: {
        flex: 1,
        margin: 8, // Margin around each movie item
        alignItems: 'center',
    },
    poster: {
        width: 160,
        height: 225,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        color: 'white',
        marginTop: 8,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default PopularMoviesScreen;