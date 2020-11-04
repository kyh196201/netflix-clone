import axios from "axios";

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
