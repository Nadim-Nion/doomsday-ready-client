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

export interface ICreateMovie {
  title: string;
  releaseYear: number;
  runtime: number;
  watched?: boolean;
  prerequisites?: string[];
}

export type IUpdateMovie = Partial<ICreateMovie>;

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
  total: number;
  totalPage: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}

export interface IMovieListResponse {
  success: boolean;
  message: string;
  data: IMovie[];
  meta: IMeta;
}
