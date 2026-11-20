export interface IMovieQuery {
  searchTerm?: string;
  sort?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | undefined;
}

export interface IMeta {
  page: number;
  limit: number;
  totalDoc: number;
  totalPage: number;
}

export interface IMovieListData {
  meta: IMeta;
  data: IMovie[];
}


export interface IMovieListResponse {
  success: boolean;
  message: string;
  data: IMovieListData;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ICreateMovie {
  title: string;
  releaseYear: number;
  runtime: number;
  watched?: boolean;
  prerequisites?: string[];
}

export type IUpdateMovie = Partial<ICreateMovie>;



//abcx
export interface IMoviePrerequisite {
  _id: string;
  title: string;
  releaseYear: number;
  runtime: number;
  watched: boolean;
}

export interface IMovie {
  _id: string;
  title: string;
  releaseYear: number;
  runtime: number;
  watched: boolean;
  prerequisites: (string | IMoviePrerequisite)[];
  posterUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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
