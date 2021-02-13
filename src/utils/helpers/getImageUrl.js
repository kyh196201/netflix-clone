// image base url
const baseUrl = "https://image.tmdb.org/t/p/";

// image sizes
const imgSizes = {
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  profile_sizes: ["w45", "w185", "h632", "original"],
  still_sizes: ["w92", "w185", "w300", "original"],
};

//
function getImageUrl(url, size = 2, type) {
  if (type === "backdrop") {
    const _url = baseUrl + imgSizes.backdrop_sizes[size] + url;
    return baseUrl + imgSizes.backdrop_sizes[size] + url;
  } else {
    return baseUrl + imgSizes.poster_sizes[size] + url;
  }
}

export default getImageUrl;
