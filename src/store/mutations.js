export default {
    // 검색 창 display 변경
    SET_IS_SEARCHING(state, toggle) {
        state.isSearching = toggle;
    },

    // 검색어 변경
    SET_SEARCH_KEYWORD(state, keyword) {
        state.searchKeyword = keyword;
    },

    // 마지막 검색어 변경
    SET_LAST_KEYWORD(state, keyword) {
        state.lastKeyword = keyword;
    },

    // 검색 결과데이터 변경
    SET_SEARCH_RESULT(state, list) {
        state.searchResult = list;
    },

    // 검색 히스토리 저장
    SET_SEARCH_HISTORY(state, keyword) {
        state.searchHistory = [...state.searchHistory, keyword];
    },
};
