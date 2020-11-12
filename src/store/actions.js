import * as api from "../api/";

export default {
    async SEARCH_MOVIE({ commit }, { query, page }) {
        const list = await api.search.movie({
            query,
            page,
        });
        commit("SET_SEARCH_RESULT", list);
        commit("SET_LAST_KEYWORD", query);
        // commit("SET_SEARCH_HISTORY", list);
    },
};
