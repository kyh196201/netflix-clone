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
      state.myList.push(movie);
    },

    // remove movie from my list
    REMOVE_MY_LIST(state, movieId) {
      const _index = state.myList.findIndex((movie) => +movie.id === +movieId);

      if (_index > -1) {
        state.myList.splice(_index, 1);
      }
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
  },
};

export default user;
