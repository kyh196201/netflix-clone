import { fetchMovie, fetchMovieDetail } from "@/api";

const movie = {
  namespaced: true,
  state: () => ({
    // main movie
    mainMovie: {},

    // selected movie
    selectedMovie: {},

    // is detail modal
    isDetailModal: false,

    // is movie card
    isMovieCard: false,

    // movie card id
    movieCardId: null,

    // movie card offset
    movieCardOffset: null,
  }),
  mutations: {
    // set main movie data
    SET_MAIN_MOVIE(state, mainMovie) {
      state.mainMovie = mainMovie;
    },

    // set selected movie data
    SET_SELECTED_MOVIE(state, movie) {
      state.selectedMovie = movie;
    },

    // set detail modal view
    SET_IS_DETAIL_MODAL(state, toggle) {
      state.isDetailModal = toggle;
    },

    // set movie card view
    SET_IS_MOVIE_CARD(state, toggle) {
      state.isMovieCard = toggle;
    },

    // set movie card id
    SET_MOVIE_CARD_ID(state, id) {
      state.movieCardId = id;
    },

    // set movie card offset
    SET_MOVIE_CARD_OFFSET(state, offset) {
      state.movieCardOffset = offset;
    },
  },
  actions: {
    // fetch main movie data
    async FETCH_MAIN_MOVIE({ commit }, id) {
      try {
        // commit('SET_LOADING', true, { root: true });
        const { data } = await fetchMovie(id);
        commit("SET_MAIN_MOVIE", data);
        return data;
      } catch (error) {
        // 에러 처리 로직
        console.warn(error);
      } finally {
        // commit("SET_LOADING", false, { root: true });
      }
    },
    // fetch selected movie data
    async FETCH_SELECTED_MOVIE({ commit }, movieId) {
      const movieData = await fetchMovieDetail(movieId);
      commit("SET_SELECTED_MOVIE", movieData);
    },
  },
};

export default movie;
