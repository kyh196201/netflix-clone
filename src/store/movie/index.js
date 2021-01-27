import { fetchMovie, fetchSelectedMovie } from "@/api";

const movie = {
    namespaced: true,
    state: () => ({
        // main movie
        mainMovie: {},
        // selected movie
        selectedMovie: {},
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
        async FETCH_SELECTED_MOVIE(context, movieId) {
            return await fetchSelectedMovie(movieId);
        },
    },
};

export default movie;
