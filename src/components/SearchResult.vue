<template>
    <div class="searchResult">
        <ul class="movie-list" v-if="data && data.length">
            <li
                class="movie-list__item"
                v-for="movie in data"
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
        <no-result v-else />
    </div>
</template>

<script>
import { IMG_PATH } from "../utils/constant.js";
import defaultImage from "../assets/images/default_image.png";
import NoResult from "./NoResult.vue";

export default {
    name: "SearchResult",
    props: ["data"],
    components: {
        "no-result": NoResult,
    },
    data() {
        return {
            imgPath: IMG_PATH,
            defaultImage: defaultImage,
        };
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
