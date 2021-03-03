import * as api from "../api/";
import { MAX_HISTORY_SIZE } from "../utils/constant.js";

export default {
  // 영화 검색
  async SEARCH_MOVIE({ commit, dispatch, state }, { query, page }) {
    let newList;

    const result = await api.search.movie({
      query,
      page,
    });

    if (page === 1) {
      newList = result.results;
      commit("SET_TOTAL_LENGTH", result.total_results);
    } else {
      newList = [...state.searchResult, ...result.results];
    }

    commit("SET_SEARCH_RESULT", newList);
    commit("SET_LAST_KEYWORD", query);

    if (result.total_results > 0 && page === 1) {
      dispatch("ADD_SEARCH_HISTORY", { keyword: query });
    }
  },

  // 검색 기록 추가
  ADD_SEARCH_HISTORY({ commit, state }, { keyword }) {
    let history;

    const _index = state.searchHistory.findIndex((item) => item === keyword);

    if (_index >= 0) {
      history = [
        keyword,
        ...state.searchHistory.slice(0, _index),
        ...state.searchHistory.slice(_index + 1),
      ];
      return commit("SET_SEARCH_HISTORY", history);
    }

    history = [keyword, ...state.searchHistory];

    if (history.length > MAX_HISTORY_SIZE) {
      history = history.slice(0, MAX_HISTORY_SIZE);
    }

    commit("SET_SEARCH_HISTORY", history);
  },

  // 검색 기록 삭제
  DELETE_SEARCH_HISTORY({ commit, state }, { index }) {
    const newHistory = [
      ...state.searchHistory.slice(0, index),
      ...state.searchHistory.slice(index + 1),
    ];

    commit("SET_SEARCH_HISTORY", newHistory);
  },

  // 영화 단일 데이터 가져오기
  async FETCH_MOVIE({ commit }, { id }) {
    try {
      const result = await api.movies.getMovieDetail(id);
      commit("SET_MOVIE_DETAIL", result);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  // 좋아요 리스트
  SET_FAVORITE_LIST({ state, commit, getters }, id) {
    // 좋아요 혹은 싫어요 리스트에 존재하는지 확인
    const isFavorite = getters.isFavoriteItem(id);
    const isHate = getters.isHateItem(id);

    if (isFavorite) {
      // 좋아요 리스트에 있는 경우
      console.log("좋아요 리스트에 있는 경우");
      commit("REMOVE_FROM_FAVORITE_LIST", id);
    } else if (!isFavorite && isHate) {
      // 싫어요 리스트에 있는 경우
      console.log("싫어요 리스트에 있는 경우");
      commit("REMOVE_FROM_HATE_LIST", id);
      commit("PUSH_TO_FAVORITE_LIST", id);
    } else if (!isFavorite && !isHate) {
      // 좋아요 싫어요 리스트에 둘다 없는 경우
      console.log("좋아요/싫어요 리스트에 둘다 없는 경우");
      commit("PUSH_TO_FAVORITE_LIST", id);
    }
  },

  // 싫어요 리스트
  SET_HATE_LIST({ state, commit, getters }, id) {
    // 좋아요 혹은 싫어요 리스트에 존재하는지 확인
    const isFavorite = getters.isFavoriteItem(id);
    const isHate = getters.isHateItem(id);

    if (isHate) {
      // 싫어요 리스트에 있는 경우
      commit("REMOVE_FROM_HATE_LIST", id);
    } else if (isFavorite && !isHate) {
      // 좋아요 리스트에 있는 경우
      commit("REMOVE_FROM_FAVORITE_LIST", id);
      commit("PUSH_TO_HATE_LIST", id);
    } else if (!isFavorite && !isHate) {
      // 좋아요 싫어요 리스트에 둘다 없는 경우
      commit("PUSH_TO_HATE_LIST", id);
    }
  },

  // 찜한 리스트
  SET_MY_LIST({ state, commit, getters }, payload) {
    const { id } = payload;

    // 마이 리스트에 존재하는지 확인
    const isMine = getters.isInMyList(id);

    if (isMine) {
      // 마이 리스트에 있는 경우
      commit("REMOVE_FROM_MY_LIST", id);
    } else {
      // 마이 리스트에 없는 경우
      commit("PUSH_TO_MY_LIST", payload);
    }
  },

  // 장르 페이지 데이터 FETCH
  async FETCH_MOVIES({ commit }, query) {
    try {
      const response = await api.discover(query);
      const { results } = response;
      commit("SET_MOVIES", results);
    } catch (e) {
      return Promise.reject(e);
    }
  },

  // infinite scroll과 연동
  async FETCH_PAGINATION_MOVIES({ commit }, query) {
    try {
      const response = await api.discover(query);
      const { results } = response;
      commit("SET_PAGINATION_MOVIES", results);
    } catch (e) {
      return Promise.reject(e);
    }
  },

  // 영화 장르 리스트 fetch
  async FETCH_GENRES({ commit }) {
    try {
      const response = await api.getGenres();
      const { genres } = response;
      commit("SET_GENRES", genres);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
