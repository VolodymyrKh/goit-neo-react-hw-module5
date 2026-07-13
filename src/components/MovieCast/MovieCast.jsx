import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { fetchMovieCast, getPosterUrl } from "../../services/tmdb";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setIsError(true);
        toast.error("Failed to load cast.");
      } finally {
        setIsLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (isError) return null;
  if (cast.length === 0)
    return (
      <p className={css.message}>
        No cast information for this movie.
      </p>
    );

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          <img
            className={css.photo}
            src={getPosterUrl(actor.profile_path)}
            alt={actor.name}
            loading="lazy"
          />
          <p className={css.name}>{actor.name}</p>
          <p className={css.character}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
