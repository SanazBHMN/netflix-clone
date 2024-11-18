import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMoviesList from "../hooks/useMoviesList";
import { useState, useRef, useCallback } from "react";

function BrowsePage() {
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useMoviesList(offset);

  const observer = useRef<null | IntersectionObserver>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset(offset + 12);
          console.log("INTERSECTING");
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // console.log(data, loading, error);

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pb-5">
        {loading && <p>LOADING...</p>}
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} lastElementRef={lastElementRef} />}
      </div>
    </div>
  );
}

export default BrowsePage;
