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

    // 검색 결과 length 데이터
    SET_TOTAL_LENGTH(state, length) {
        state.totalLength = length;
    },

    // 검색 히스토리 저장
    SET_SEARCH_HISTORY(state, history) {
        state.searchHistory = history;
    },

    // 영화 상세정보 저장
    SET_MOVIE_DETAIL(state, data) {
        state.movieDetail = data;
    },
};
