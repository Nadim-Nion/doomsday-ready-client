
import MovieCollectionPage from "./MovieCollection";

import {
  useGetAllMoviesQuery,
  useUpdateMovieMutation,
} from "../../redux/features/movie/movieApi";

import type { IMovie } from "../../redux/features/movie/movie.types";

const MovieView = () => {
  // Fetch all movies
  const {
    data: movieResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllMoviesQuery();

  // Update movie mutation
  const [updateMovie] = useUpdateMovieMutation();

  // Extract movies from the API response
//   const movies: IMovie[] = movieResponse?.data ?? [];
const movies: IMovie[] = movieResponse?.data?.data ?? [];

  // Handle watched status
  const handleToggleWatched = async (
    movieId: string,
    watched: boolean,
  ) => {
    try {
      await updateMovie({
        movieId,
        payload: { watched },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  // Convert API error into a readable message
  const errorMessage = error
    ? "Unable to fetch movies. Please try again."
    : null;

  return (
    <div>
      <MovieCollectionPage
        movies={movies}
        loading={isLoading}
        error={errorMessage}
        onToggleWatched={handleToggleWatched}
        onRetry={refetch}
        onAddMovie={() => {
          // Open your Add Movie modal here
        }}
      />
    </div>
  );
};

export default MovieView;
