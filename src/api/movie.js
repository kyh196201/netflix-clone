import { movieAxios } from "./index";

/* refactoring 
    2021.01.28
*/
// fetch genres
export const getGenres = async () => {
  const url = `/genre/movie/list`;
  return await movieAxios.get(url);
};

// fetch movies data by category
export const fetchMovies = async (category, page) => {
  page || (page = 1);
  const url = `/movie/${category}?page=${page}`;
  return await movieAxios.get(url);
};

// fetch movie data
export const fetchMovie = async (id) => {
  const url = `/movie/${id}`;
  return await movieAxios.get(url);
};

// fetch movie credits
export const fetchMovieCredits = async (id) => {
  const response = await movieAxios.get(`movie/${id}/credits`);
  return response;
};

// fetch selected movie data
export const fetchMovieDetail = async (id) => {
  const [movieCredits, movieData] = await axios.all([
    fetchMovieCredits(id),
    fetchMovie(id),
  ]);

  const result = {
    cast: movieCredits.data.cast,
    crew: movieCredits.data.crew,
    ...movieData.data,
  };

  return result;
};

export const fetchSortedMovie = async (query) => {
  const url = `/discover/movie?${query}`;
  const response = await movieAxios(url);
  return response.data;
};
