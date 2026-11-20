import MovieCollectionPage from "./MovieCollection";

const MovieView = () => {
  return (
    <div>
      <MovieCollectionPage movies={[]} onToggleWatched={() => {}} />
    </div>
  );
};

export default MovieView;
