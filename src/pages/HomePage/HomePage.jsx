import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { fetchTrendingMovies } from "../../services/tmdb";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setIsError(true);
        toast.error("Failed to load trending movies.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      {!isError && movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}

export default HomePage;
