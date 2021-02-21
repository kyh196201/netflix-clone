export function getRuntime(runtime) {
  const hours = parseInt(runtime / 60);
  const mins = runtime - hours * 60;
  return `${hours}시간 ${mins}분`;
}

export function getReleaseDate(releaseDate) {
  return releaseDate.slice(0, 4);
}

// remove movie from movie list
export function removeMovie(movieId, movieList) {}

// find movie in movie list
export function findMovieIndex(movieId, movieList) {
  if (!Array.isArray(movieList)) {
    throw new TypeError(`${movieList}가 배열이 아닙니다.`);
  }

  if (typeof movieId === "string") movieId = +movieId;

  let index = -1;

  if (movieList.length > 0) {
    const movieIndex = movieList.findIndex((movie) => +movie.id === movieId);

    if (movieIndex !== -1) {
      index = movieIndex;
    }
  }

  return index;
}
