import axios from "axios";
import store from "../store/index.js";

//FIXME 성인인지 체크 => 추후에 Profile의 나이 또는 키듸 여부 확인을 통해 변경 예정
const isAdult = store.state.isAdult;

const API_KEY = "5c641d77de2e4b7554d8ebbf14934986";
const END_POINT = "https://api.themoviedb.org/3";
const LANG = "ko";

// Axios 인스턴스 만들기
const movieAxios = axios.create({
    baseURL: END_POINT,
});

// 2.5초 간만 대기 후 타임아웃 처리
movieAxios.defaults.timeout = 2500;
movieAxios.defaults.params = {};
movieAxios.defaults.params["api_key"] = API_KEY;
movieAxios.defaults.params["language"] = LANG;
movieAxios.defaults.params["include_adult"] = isAdult;

// validation
// console.log(axios.defaults.validateStatus);

const request = {
    async get(url) {
        try {
            const res = await movieAxios.get(url);
            return res.data;
        } catch (err) {
            // 여기서 에러 핸들링..?
            return Promise.reject(err);
        }
    },
};

export const requestAll = async (...params) => {
    return await axios.all.apply(this, params);
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
    return await request(url);
};
