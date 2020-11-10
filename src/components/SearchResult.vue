<template>
    <div class="searchResult">
        <template v-if="list">
            <pre>
                {{ list }}
            </pre>
        </template>
        <ul class="movie-list">
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
            <li class="movie-list__item">
                <div class="movie">
                    <figure class="movie__thumbnail">
                        <img
                            src="https://image.tmdb.org/t/p/w185/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg"
                            alt="thumbnail__img"
                        />
                    </figure>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "SearchResult",
    computed: {
        ...mapState({
            list: (state) => state.searchResult,
        }),
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
