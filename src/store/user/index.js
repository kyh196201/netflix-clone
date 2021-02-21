import { setItem, getItem, STORAGE_KEY } from "@/utils/helpers/storage";
import { findMovieIndex } from "@/utils/helpers/movie";

const user = {
  namespaced: true,

  state: () => ({
    // 내가 찜한 리스트
    myList: [],

    // 좋아요 누른 리스트
    likeList: [],

    // 싫어요 누른 리스트
    hateList: [],
  }),

  // getters
  getters: {
    // check movie is in my list
    isInMyList(state) {
      return (movieId) => {
        return findMovieIndex(movieId, state.myList) > -1;
      };
    },

    // check movie is in like list
    isInLikeList(state) {
      return (movieId) => {
        return findMovieIndex(movieId, state.likeList) > -1;
      };
    },

    // check movie is in hate list
    isInHateList(state) {
      return (movieId) => {
        return findMovieIndex(movieId, state.hateList) > -1;
      };
    },

    // get my movie list
    my(state) {
      return state.myList;
    },

    // get like movie list
    like(state) {
      return state.likeList;
    },

    // get hate movie list
    hate(state) {
      return state.hateList;
    },
  },

  // mutations
  mutations: {
    // push movie to my list
    PUSH_MY_LIST(state, movie) {
      if (Array.isArray(movie)) {
        // movie가 배열일 경우
        state.myList.push(...movie);
      } else {
        // movie가 일반 객체일 경우
        state.myList.push(movie);
      }

      setItem(STORAGE_KEY.my_list, state.myList);
    },

    // remove movie from my list
    REMOVE_MY_LIST(state, movieId) {
      const _index = state.myList.findIndex((movie) => +movie.id === +movieId);

      if (_index > -1) {
        state.myList.splice(_index, 1);
      }
      setItem(STORAGE_KEY.my_list, state.myList);
    },

    // push movie to like list
    PUSH_LIKE_LIST(state, movie) {
      if (Array.isArray(movie)) {
        state.likeList = [...movie];
      } else {
        state.likeList.push(movie);
      }

      setItem(STORAGE_KEY.like_list, state.likeList);
    },

    // remove movie from like list
    REMOVE_LIKE_LIST(state, movieId) {
      const _index = state.likeList.findIndex(
        (movie) => +movie.id === +movieId
      );

      if (_index > -1) {
        state.likeList.splice(_index, 1);
      }
      setItem(STORAGE_KEY.my_list, state.likeList);
    },

    // push movie to hate list
    PUSH_HATE_LIST(state, movie) {
      if (Array.isArray(movie)) {
        state.hateList = [...movie];
      } else {
        state.hateList.push(movie);
      }

      setItem(STORAGE_KEY.hate_list, state.hateList);
    },

    // remove movie from like list
    REMOVE_HATE_LIST(state, movieId) {
      const _index = state.hateList.findIndex(
        (movie) => +movie.id === +movieId
      );

      if (_index > -1) {
        state.hateList.splice(_index, 1);
      }
      setItem(STORAGE_KEY.hate_list, state.hateList);
    },
  },

  actions: {
    // add movie to my list
    ADD_MOVIE_TO_MY_LIST({ commit }, movie) {
      commit("PUSH_MY_LIST", movie);
    },

    // remove movie from my list
    REMOVE_FROM_MY_LIST({ commit }, movieId) {
      commit("REMOVE_MY_LIST", movieId);
    },

    // add movie to like list
    ADD_MOVIE_TO_LIKE_LIST({ commit, dispatch, getters }, movie) {
      // 싫어요 리스트에 있는지 검색
      const _index = findMovieIndex(movie.id, getters.hate);

      if (_index !== -1) {
        dispatch("REMOVE_FROM_HATE_LIST", movie.id);
      }

      commit("PUSH_LIKE_LIST", movie);
    },

    // remove movie from like list
    REMOVE_FROM_LIKE_LIST({ commit }, movieId) {
      commit("REMOVE_LIKE_LIST", movieId);
    },
    // add movie to hate list
    ADD_MOVIE_TO_HATE_LIST({ commit, dispatch, getters }, movie) {
      // 좋아요 리스트에 있는지 검색
      const _index = findMovieIndex(movie.id, getters.like);

      if (_index !== -1) {
        dispatch("REMOVE_FROM_LIKE_LIST", movie.id);
      }

      commit("PUSH_HATE_LIST", movie);
    },

    // remove movie from hate list
    REMOVE_FROM_HATE_LIST({ commit }, movieId) {
      commit("REMOVE_HATE_LIST", movieId);
    },

    // 좋아요, 싫어요, 찜한 목록 초기화 action
    INIT_USER_LIST({ commit }) {
      console.log("INIT_USER_LIST");

      const myList = getItem(STORAGE_KEY.my_list);
      const likeList = getItem(STORAGE_KEY.like_list);
      const hateList = getItem(STORAGE_KEY.hate_list);

      if (myList) {
        commit("PUSH_MY_LIST", JSON.parse(myList));
      }

      if (likeList) {
        commit("PUSH_LIKE_LIST", JSON.parse(likeList));
      }

      if (hateList) {
        commit("PUSH_HATE_LIST", JSON.parse(hateList));
      }
    },
  },
};

export default user;
