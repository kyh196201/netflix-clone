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

    // 좋아하는 영화 리스트 세팅
    SET_FAVORITE_LIST(state, list) {
        state.favoriteList = list;
    },

    // 좋아하는 영화 리스트 추가
    PUSH_TO_FAVORITE_LIST(state, id) {
        state.favoriteList.push(id);
        localStorage.setItem(
            "favoriteList",
            JSON.stringify(state.favoriteList)
        );
    },

    // 좋아하는 영화 리스트 제거
    REMOVE_FROM_FAVORITE_LIST(state, id) {
        const index = state.favoriteList.findIndex((item) => item === id);

        if (index > -1) {
            state.favoriteList = [
                ...state.favoriteList.slice(0, index),
                ...state.favoriteList.slice(index + 1),
            ];
            localStorage.setItem(
                "favoriteList",
                JSON.stringify(state.favoriteList)
            );
        }
    },

    // 싫어하는 영화 리스트 세팅
    SET_HATE_LIST(state, list) {
        state.hateList = list;
    },

    // 싫어하는 영화 리스트 추가
    PUSH_TO_HATE_LIST(state, id) {
        state.hateList.push(id);
        localStorage.setItem("hateList", JSON.stringify(state.hateList));
    },

    // 싫어하는 영화 리스트 제거
    REMOVE_FROM_HATE_LIST(state, id) {
        const index = state.hateList.findIndex((item) => item === id);

        if (index > -1) {
            state.hateList = [
                ...state.hateList.slice(0, index),
                ...state.hateList.slice(index + 1),
            ];
            localStorage.setItem("hateList", JSON.stringify(state.hateList));
        }
    },

    // 내 목록 리스트 세팅
    SET_MY_LIST(state, list) {
        state.myList = list;
    },

    // 내 목록 리스트 추가
    PUSH_TO_MY_LIST(state, movie) {
        state.myList.push(movie);
        localStorage.setItem("myList", JSON.stringify(state.myList));
    },

    // 내 목록 리스트 제거
    REMOVE_FROM_MY_LIST(state, id) {
        const index = state.myList.findIndex((item) => item.id === id);

        if (index > -1) {
            state.myList = [
                ...state.myList.slice(0, index),
                ...state.myList.slice(index + 1),
            ];
            localStorage.setItem("myList", JSON.stringify(state.myList));
        }
    },

    // 영화 리스트
    SET_MOVIES(state, movies) {
        state.movies = movies || [];
    },

    SET_PAGINATION_MOVIES(state, movies) {
        state.movies = [...state.movies, ...movies];
    },

    // 영화 장르 리스트
    SET_GENRES(state, genres) {
        state.genres = genres;
    },
};
