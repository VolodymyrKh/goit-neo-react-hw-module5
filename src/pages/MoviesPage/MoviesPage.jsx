import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { fetchMoviesByQuery } from "../../services/tmdb";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.query.value.trim();

    if (value === "") {
      toast.error("Please enter a search term.");
      return;
    }

    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch {
        setIsError(true);
        toast.error("Failed to search movies.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          defaultValue={query}
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <Loader />}
      {!isLoading && !isError && query !== "" && movies.length === 0 && (
        <p className={css.message}>No movies found for "{query}".</p>
      )}
      {!isError && query !== "" && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </>
  );
}

export default MoviesPage;
