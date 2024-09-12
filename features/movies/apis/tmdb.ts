import { Movie } from "../movie";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTdiNDFkZDI0Y2UyYTNmNDgxMGNkODBlZmFlMTJiYSIsIm5iZiI6MTcyNTM0Mjc5OS41NDQ4ODUsInN1YiI6IjY2ZDZhMzhkM2ZjOGEwNjBjOWJkMjMzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LvlMctoJjCrP1llrVGHH3n44YbL5UyGTKjrFObXhw94";

export const getPopularMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`, // Replace with your actual access token
      },
    }
  );
  // For this: ideally we need validation logic to make sure that the response is of type Move as we expected
  const data = await response.json();
  return data.results as unknown as Movie[];
};
