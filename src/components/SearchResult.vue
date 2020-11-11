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
        <div v-else>
            no data.
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { IMG_PATH } from "../utils/constant.js";
import defaultImage from "../assets/images/default_image.png";

export default {
    name: "SearchResult",
    data() {
        return {
            imgPath: IMG_PATH,
            defaultImage: defaultImage,
        };
    },
    computed: {
        ...mapState({
            list: (state) => state.searchResult,
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
