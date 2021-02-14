import { setItem, getItem, STORAGE_KEY } from "@/utils/helpers/storage";

const user = {
  namespaced: true,

  state: () => ({
    // 내가 찜한 리스트
    myList: [],

    // 좋아요 누른 리스트
    favoriteList: [],

    // 싫어요 누른 리스트
    hateList: [],
  }),

  getters: {
    // check movie is in my list
    isInMyList(state) {
      return (movieId) => {
        const _index = state.myList.findIndex(
          (movie) => +movie.id === +movieId
        );
        return _index > -1;
      };
    },
  },

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

    // 좋아요, 싫어요, 찜한 목록 초기화 action
    INIT_USER_LIST({ commit }) {
      console.log("INIT_USER_LIST");

      const myList = getItem(STORAGE_KEY.my_list);

      if (myList) {
        commit("PUSH_MY_LIST", JSON.parse(myList));
      }
    },
  },
};

export default user;
