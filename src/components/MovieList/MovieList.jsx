import { Link, useLocation } from "react-router-dom";
import { getPosterUrl } from "../../services/tmdb";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={css.link}
          >
            <img
              className={css.poster}
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
            />
            <h3 className={css.title}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
