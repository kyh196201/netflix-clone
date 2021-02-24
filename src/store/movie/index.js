import { fetchMovie, fetchMovieDetail } from "@/api";
import { getGenres } from "@/api/movie";

const movie = {
  namespaced: true,

  // State
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

    // movie card data
    movieCardData: null,

    // all genres
    genres: [],

    // movie sorts/filteres
    movieFilters: [
      {
        name: "인기 많은 순",
        value: "populairty.desc",
      },
      {
        name: "인기 적은 순",
        value: "populairty.asc",
      },
      {
        name: "출시 빠른 순",
        value: "release_date.desc",
      },
      {
        name: "출시 늦은 순",
        value: "release_date.desc",
      },

      {
        name: "평점 높은 순",
        value: "vote_average.desc",
      },
      {
        name: "평점 낮은 순",
        value: "vote_average.desc",
      },
    ],
  }),

  // Getters
  getters: {
    genres(state) {
      return state.genres;
    },
  },

  // Mutations
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

    // set movie card data
    SET_MOVIE_CARD_DATA(state, data) {
      console.log("SET_MOVIE_CARD_DATA", data);
      state.movieCardData = data;
    },

    // set all genres
    SET_GENRES(state, genres) {
      state.genres = genres;
    },
  },

  // Actions
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

    // fetch movie card data
    async FETCH_MOVIE_CARD({ commit }, id) {
      const { data } = await fetchMovie(id);
      commit("SET_MOVIE_CARD_DATA", data);
      // commit("SET_IS_MOVIE_CARD", true);
    },

    // clear movie card state
    CLEAR_MOVIE_CARD({ commit }) {
      commit("SET_IS_MOVIE_CARD", false);
      commit("SET_MOVIE_CARD_ID", null);
      commit("SET_MOVIE_CARD_OFFSET", null);
    },

    // FETCH ALL GENRES
    async FETCH_GENRES({ commit }) {
      const { data } = await getGenres();
      commit("SET_GENRES", data.genres);
    },

    // init movie store
    INIT_MOVIE_STORE({ dispatch }) {
      dispatch("FETCH_GENRES");
    },
  },
};

export default movie;
