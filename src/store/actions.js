import * as api from "../api/";
import { MAX_HISTORY_SIZE } from "../utils/constant.js";

export default {
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
    ADD_SEARCH_HISTORY({ commit, state }, { keyword }) {
        let history;

        const _index = state.searchHistory.findIndex(
            (item) => item === keyword
        );

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

    DELETE_SEARCH_HISTORY({ commit, state }, { index }) {
        const newHistory = [
            ...state.searchHistory.slice(0, index),
            ...state.searchHistory.slice(index + 1),
        ];

        commit("SET_SEARCH_HISTORY", newHistory);
    },
};
