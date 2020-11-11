<template>
    <div class="searchResult">
        <template v-if="movieList && movieList.length">
            <ul class="movie-list">
                <li
                    class="movie-list__item"
                    v-for="movie in movieList"
                    :key="movie.id"
                    :data-movie-id="movie.id"
                >
                    <div class="movie">
                        <figure class="movie__thumbnail">
                            <img
                                :src="getPoster(movie['poster_path'])"
                                :alt="movie.title"
                                @error="onError"
                            />
                        </figure>
                    </div>
                </li>
            </ul>
        </template>
        <no-result v-else :keyword="inputKeyword" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import { IMG_PATH } from "../utils/constant.js";
import defaultImage from "../assets/images/default_image.png";
import NoResult from "./NoResult.vue";

export default {
    name: "SearchResult",
    components: {
        "no-result": NoResult,
    },
    data() {
        return {
            imgPath: IMG_PATH,
            defaultImage: defaultImage,
            inputKeyword: "",
        };
    },
    computed: {
        ...mapState({
            list: (state) => state.searchResult,
            keyword: (state) => state.searchKeyword,
        }),
        page() {
            return this.list.page;
        },
        totalPage() {
            return this.list["total_pages"];
        },
        movieList() {
            return this.list.results;
        },
        isMoreData() {
            return this.totalPage > this.page;
        },
    },
    created() {
        // FIXME this.keyword값은 searchInput의 input태그와 양방향 바인딩되어있으므로, input의 값에 따라 변하지 않도록 새로운 데이터를 추가
        this.inputKeyword = this.keyword;
    },
    methods: {
        getPoster(poster) {
            return this.imgPath + poster;
        },
        onError(event) {
            event.target.src = this.defaultImage;
        },
    },
};
</script>

<style>
.searchResult {
    width: 100%;
}

.movie-list {
    display: flex;
    flex: 1 1;
    flex-wrap: wrap;
}

.movie-list__item {
    /* width: 20%; */
    height: 150px;
    /* margin: 0 10px 50px 10px; */
    margin-bottom: 50px;
    transition: 250ms all;
}

.movie-list__item:hover {
    transform: scale(1.1);
}
</style>
