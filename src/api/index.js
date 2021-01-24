import axios from "axios";
import setInterceptors from "./common/interceptors";

function createInstance() {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_TMDB_END_POINT,
        params: {
            api_key: process.env.VUE_APP_TMDB_API_KEY,
        },
    });
    return setInterceptors(instance);
}

const movieAxios = createInstance();

const request = {
    async get(url) {
        const { data } = await movieAxios.get(url);
        return data;
    },
};

export const requestAll = async (...params) => {
    return await axios.all(...params);
};

export const movies = {
    async detail(id) {
        const url = `/movie/${id}`;
        return await request.get(url);
    },
    async credits(id) {
        const url = `/movie/${id}/credits`;
        return await request.get(url);
    },
    async getMovieDetail(id) {
        const [detail, credits] = await requestAll([
            movies.detail(id),
            movies.credits(id),
        ]);

        const cast = credits && credits.cast ? credits.cast : [];
        const crew = credits && credits.crew ? credits.crew : [];

        return {
            detail: detail,
            cast: cast,
            crew: crew,
        };
    },
    async latest() {
        const url = `/movie/latest`;
        return await request.get(url);
    },
    async playing(page) {
        page = page ? page : 1;
        const url = `/movie/now_playing?page=${page}`;
        return await request.get(url);
    },
    async topRated(page) {
        page = page ? page : 1;
        const url = `/movie/top_rated?page=${page}&region=KR`;
        return await request.get(url);
    },
    async upComing(page) {
        page = page ? page : 1;
        const url = `/movie/upcoming?page=${page}&region=KR`;
        return await request.get(url);
    },
    async fetchVideo(id) {
        try {
            const url = `/movie/${id}/videos?language=en-US`;
            const response = await videoAxios.get(url);
            return response.data.results;
        } catch (err) {
            return Promise.reject(err);
        }
    },
};

export const fetchMovies = async (category, page) => {
    page || (page = 1);
    const url = `/movie/${category}?page=${page}`;
    return await movieAxios.get(url);
};

// 검색
export const search = {
    // 멀티 검색
    async multi({ query, page }) {},
    // 영화 검색
    async movie({ query, page }) {
        page = page ? page : 1;
        const url = `/search/movie?query=${query}&page=${page}`;
        return await request.get(url);
    },
};

// 다양한 필터를 통해 영화 데이터 연동
export const discover = async (query) => {
    const url = `/discover/movie?${query}`;
    return await request.get(url);
};

// 배우 id로 영화 검색
export const fetchByPeople = async (id) => {
    const url = `/discover/movie?with_people=${id}`;
    try {
        const result = await request.get(url);
        return result;
    } catch (err) {
        return Promise.reject(err);
    }
};

// 배우 검색
export const getPeoPleInfo = async (id) => {
    const url = `/person/${id}`;
    const result = await request.get(url);
    return result;
};

export const getGenres = async () => {
    const url = `/genre/movie/list`;
    return await request.get(url);
};
