import MovieCard from "./MovieCard";
import { Movie } from "../types";

function MovieList({
  movies,
  lastElementRef,
}: {
  movies: Movie[];
  lastElementRef: (node: HTMLDivElement) => void;
}) {
  return (
    <div className="px-12 mt-4 space-y-8">
      <div>
        <p className="text-black text-2xl font-semibold mb-4">Popular Shows</p>
        <div className="flex flex-wrap justify-between gap-2">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              lastElementRef={
                movies.length === index + 1 ? lastElementRef : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
