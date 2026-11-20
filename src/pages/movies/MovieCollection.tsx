import { useMemo, useState } from "react";
import type {
  IMovieCardProps,
  IMovieCollectionPageProps,
  IStatCardProps,
  TSortOption,
  TWatchedFilter,
} from "../../types/movie.types";

const MovieCollectionPage = ({
  movies,
  loading = false,
  error = null,
  onAddMovie,
  onToggleWatched,
  onRetry,
}: IMovieCollectionPageProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TWatchedFilter>("all");
  const [sort, setSort] = useState<TSortOption>("newest");

  const filteredMovies = useMemo(() => {
    const result = movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "watched" && movie.watched) ||
        (filter === "unwatched" && !movie.watched);

      return matchesSearch && matchesFilter;
    });

    return result.sort((a, b) => {
      if (sort === "newest") {
        return b.releaseYear - a.releaseYear;
      }

      if (sort === "oldest") {
        return a.releaseYear - b.releaseYear;
      }

      return a.title.localeCompare(b.title);
    });
  }, [movies, search, filter, sort]);

  const watchedCount = movies.filter((movie) => movie.watched).length;

  const unwatchedCount = movies.length - watchedCount;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page Header */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-red-400">
              Marvel Cinematic Universe
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Doomsday Ready Movie Collection
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage your movies and prepare your ultimate MCU rewatch.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddMovie}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
          >
            <span aria-hidden="true">＋</span>
            Add Movie
          </button>
        </section>

        {/* Collection Statistics */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="Total Movies" value={movies.length} icon="🎬" />

          <StatCard label="Watched" value={watchedCount} icon="✓" />

          <StatCard label="Unwatched" value={unwatchedCount} icon="◷" />
        </section>

        {/* Search and Filters */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search movies by title..."
                aria-label="Search movies by title"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value as TWatchedFilter)
                }
                aria-label="Filter movies by watched status"
                className="min-w-0 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500 sm:min-w-40"
              >
                <option value="all">All Movies</option>
                <option value="watched">Watched</option>
                <option value="unwatched">Unwatched</option>
              </select>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as TSortOption)}
                aria-label="Sort movies"
                className="min-w-0 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500 sm:min-w-40"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Your Movies</h2>

            <p className="text-sm text-slate-400">
              Showing {filteredMovies.length} of {movies.length}
            </p>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label="Loading movies"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                <div className="aspect-3/4 bg-slate-800" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 rounded bg-slate-800" />
                  <div className="h-4 w-1/2 rounded bg-slate-800" />
                  <div className="h-9 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-center"
          >
            <p className="font-semibold text-red-300">
              Unable to load your movies
            </p>

            <p className="mt-2 text-sm text-slate-400">{error}</p>

            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500"
              >
                Try Again
              </button>
            )}
          </div>
        )}

        {/* Movie Collection */}
        {!loading && !error && filteredMovies.length > 0 && (
          <section
            aria-label="Movie collection"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onToggleWatched={onToggleWatched}
              />
            ))}
          </section>
        )}

        {/* Empty State */}
        {!loading && !error && filteredMovies.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-5 py-16 text-center">
            <div className="mb-4 text-5xl" aria-hidden="true">
              🎬
            </div>

            <h3 className="text-lg font-semibold">
              {movies.length === 0
                ? "Your collection is empty"
                : "No movies found"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              {movies.length === 0
                ? "Start building your MCU collection by adding your first movie."
                : "Try another search term or change your filters."}
            </p>

            {movies.length === 0 && (
              <button
                type="button"
                onClick={onAddMovie}
                className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold hover:bg-red-500"
              >
                Add Your First Movie
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

const StatCard = ({ label, value, icon }: IStatCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xl">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      </div>
    </div>
  );
}

const MovieCard = ({ movie, onToggleWatched }: IMovieCardProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-black/20">
      {/* Poster */}
      <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-slate-800 via-slate-900 to-red-950">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={`${movie.title} movie poster`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <span className="text-6xl" aria-hidden="true">
              🎬
            </span>
            <p className="mt-4 text-lg font-bold text-white">{movie.title}</p>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            movie.watched
              ? "bg-emerald-500/90 text-white"
              : "bg-slate-950/80 text-slate-200"
          }`}
        >
          {movie.watched ? "✓ Watched" : "Not Watched"}
        </span>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="line-clamp-2 text-xl font-bold text-white">
            {movie.title}
          </h3>

          <p className="mt-1 text-sm text-slate-300">{movie.releaseYear}</p>
        </div>
      </div>

      {/* Movie Information */}
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-slate-400">Runtime</span>

          <span className="font-medium text-slate-200">
            {movie.runtime} min
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-slate-400">Prerequisites</span>

          <span className="font-medium text-slate-200">
            {movie.prerequisites?.length ?? 0} movies
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleWatched(movie._id, !movie.watched)}
          aria-pressed={movie.watched}
          className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            movie.watched
              ? "border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 focus:ring-slate-400"
              : "bg-red-600 text-white hover:bg-red-500 focus:ring-red-400"
          }`}
        >
          {movie.watched ? "Mark as Unwatched" : "Mark as Watched"}
        </button>
      </div>
    </article>
  );
}

export default MovieCollectionPage;
