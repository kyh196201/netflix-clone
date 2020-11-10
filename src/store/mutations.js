export default {
    SET_IS_SEARCHING(state, toggle) {
        state.isSearching = toggle;
    },
    SET_SEARCH_RESULT(state, list) {
        state.searchResult = list;
    },
};
