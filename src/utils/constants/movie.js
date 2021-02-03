const movieCategories = [
    "latest",
    "popular",
    "now_playing",
    "top_rated",
    "upcoming",
];

const movieTags = [
    {
        title: "출연",
        type: "person",
    },
    {
        title: "제작",
        type: "person",
    },
    {
        title: "장르",
        type: "genre",
    },
];

const getMovieTagType = (title) => {
    return movieTags.filter((tag) => tag.title === title)[0];
};

export { movieCategories, getMovieTagType, movieTags };
