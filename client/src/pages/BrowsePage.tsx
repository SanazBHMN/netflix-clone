import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";

function BrowsePage() {
  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pb-5">
        <MovieList />
      </div>
    </div>
  );
}

export default BrowsePage;
