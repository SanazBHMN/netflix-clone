import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMoviesList from "../hooks/useMoviesList";
import { useState } from "react";

function BrowsePage() {
  const [offset, setOffset] = useState(12);
  const { data, loading, error } = useMoviesList(offset);

  // console.log(data, loading, error);

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pb-5">
        {loading && <p>LOADING...</p>}
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} />}
      </div>
    </div>
  );
}

export default BrowsePage;
