import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
  params: {
    language: "en-US",
  },
});

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const PLACEHOLDER_POSTER =
  "https://placehold.co/500x750?text=No+image";

export const getPosterUrl = (path) =>
  path ? `${IMAGE_BASE_URL}${path}` : PLACEHOLDER_POSTER;

export const fetchTrendingMovies = async () => {
  const { data } = await tmdbApi.get("/trending/movie/day");
  return data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const { data } = await tmdbApi.get("/search/movie", {
    params: { query, include_adult: false, page: 1 },
  });
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}`);
  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}/reviews`);
  return data.results;
};
