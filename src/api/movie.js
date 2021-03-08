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
  console.log(query);

  const options = {
    data: {},
    params: {},
  };

  let url = "/discover/movie";

  if (typeof query === "string") {
    // 문자열 인지 체크
    url = url + `?${query}`;
  } else if (Object.prototype.toString.call(query) === "[object Object]") {
    // 객체인지 체크
    options.params = query;

    console.log(options);
  }

  const response = await movieAxios(url, {
    data: options.data,
    params: options.params,
  });
  return response.data;
};
