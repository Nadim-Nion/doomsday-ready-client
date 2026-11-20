export interface IMovie {
  _id: string;
  title: string;
  releaseYear: number;
  runtime: number;
  watched: boolean;
  prerequisites: string[];
  posterUrl?: string;
}

export type TWatchedFilter = "all" | "watched" | "unwatched";
export type TSortOption = "newest" | "oldest" | "title";

export interface IMovieCollectionPageProps {
  movies: IMovie[];
  loading?: boolean;
  error?: string | null;
  onAddMovie?: () => void;
  onToggleWatched: (movieId: string, watched: boolean) => void;
  onRetry?: () => void;
}

export interface IStatCardProps {
  label: string;
  value: number;
  icon: string;
}

export interface IMovieCardProps {
  movie: IMovie;
  onToggleWatched: (movieId: string, watched: boolean) => void;
}
