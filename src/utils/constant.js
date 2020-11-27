// SHOW 타이틀
export const TITLE = {
    topRated: "높은 평점",
    upComing: "개봉 예정",
    playing: "상영중",
};

// 포스터 이미지 Path
const IMG_PATH = "https://image.tmdb.org/t/p/";

// 포스터 이미지 Size
const IMG_SIZES = {
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profile_sizes: ["w45", "w185", "h632", "original"],
    still_sizes: ["w92", "w185", "w300", "original"],
};

export const POSTER_PATH = IMG_PATH + IMG_SIZES["poster_sizes"][2];
export const BACKDROP_PATH = IMG_PATH + IMG_SIZES["backdrop_sizes"][2];

export const getPoster = (url) => POSTER_PATH + url;

// 스와이퍼 옵션
export const SLIDES_PER_VIEW = 5;
export const SPACE_BETWEEN = 5;
export const SPEED = 500;

export const KEYS = {
    backspace: 8,
    enter: 13,
    esc: 27,
    delete: 46,
};

// history length
export const MAX_HISTORY_SIZE = 10;
