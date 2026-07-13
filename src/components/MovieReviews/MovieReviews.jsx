import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { fetchMovieReviews } from "../../services/tmdb";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setIsError(true);
        toast.error("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (isError) return null;
  if (reviews.length === 0)
    return (
      <p className={css.message}>
        We don&apos;t have any reviews for this movie.
      </p>
    );

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <h4 className={css.author}>{review.author}</h4>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
