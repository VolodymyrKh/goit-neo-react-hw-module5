import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import clsx from "clsx";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { fetchMovieDetails, getPosterUrl } from "../../services/tmdb";
import css from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  // eslint-disable-next-line react-hooks/refs
  const backHref = backLinkRef.current;

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setIsError(true);
        toast.error("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [movieId]);

  return (
    <>
      <Link to={backHref} className={css.goBack}>
        ← Go back
      </Link>

      {isLoading && <Loader />}

      {!isError && movie && (
        <>
          <div className={css.details}>
            <img
              className={css.poster}
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
            />
            <div className={css.info}>
              <h1 className={css.title}>
                {movie.title}{" "}
                {movie.release_date && (
                  <span>({movie.release_date.slice(0, 4)})</span>
                )}
              </h1>
              <p className={css.score}>
                User score: {Math.round(movie.vote_average * 10)}%
              </p>
              <h2 className={css.subtitle}>Overview</h2>
              <p>{movie.overview || "No overview available."}</p>
              {movie.genres?.length > 0 && (
                <>
                  <h2 className={css.subtitle}>Genres</h2>
                  <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                </>
              )}
            </div>
          </div>

          <div className={css.extra}>
            <h3 className={css.extraTitle}>Additional information</h3>
            <ul className={css.extraNav}>
              <li>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
