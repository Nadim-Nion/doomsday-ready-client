import type { IMovieListResponse, IMovieQuery } from "../../../types/movie.types";
import { baseApi } from "../../api/baseApi";
// import type { IMovieListResponse, IMovieQuery } from "../../types/movie.type";

import type {
  IApiResponse,
  ICreateMovie,
  IMovie,
  IUpdateMovie,
} from "./movie.types";

const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL MOVIES
    getAllMovies: builder.query<IMovieListResponse, IMovieQuery | void>({
      query: (params) => ({
        url: "/movies",
        method: "GET",
        params: params ?? {},
      }),

      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map((movie) => ({
                type: "Movie" as const,
                id: movie._id,
              })),
              { type: "Movie" as const, id: "LIST" },
            ]
          : [{ type: "Movie" as const, id: "LIST" }],
    }),

    // GET SINGLE MOVIE
    getSingleMovie: builder.query<IApiResponse<IMovie>, string>({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: "GET",
      }),

      providesTags: (_result, _error, movieId) => [
        { type: "Movie", id: movieId },
      ],
    }),

    // CREATE MOVIE
    createMovie: builder.mutation<IApiResponse<IMovie>, ICreateMovie>({
      query: (movieData) => ({
        url: "/movies",
        method: "POST",
        body: movieData,
      }),

      invalidatesTags: [{ type: "Movie", id: "LIST" }],
    }),

    // UPDATE MOVIE
    updateMovie: builder.mutation<
      IApiResponse<IMovie>,
      { movieId: string; payload: IUpdateMovie }
    >({
      query: ({ movieId, payload }) => ({
        url: `/movies/${movieId}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: (_result, _error, { movieId }) => [
        { type: "Movie", id: movieId },
        { type: "Movie", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetSingleMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
} = movieApi;

export default movieApi;
