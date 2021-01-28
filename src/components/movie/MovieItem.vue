<template>
    <div
        class="movieItem"
        @click="onClickMovieItem"
        :data-movie-id="this.movieId"
    >
        <figure>
            <img :src="poster" :alt="title" />
        </figure>
    </div>
</template>

<script>
import getImageUrl from "@/utils/helpers/getImageUrl";
import { mapMutations } from "vuex";
export default {
    props: {
        movie: {
            type: Object,
            required: true,
        },
    },
    computed: {
        title() {
            return this.movie.title;
        },
        poster() {
            return getImageUrl(this.movie.poster_path, 2, "poster");
        },
        movieId() {
            return +this.movie.id;
        },
        // query의 movieId 값이 있고, 현재 movieId 값과 같은지 여부
        isSameQuery() {
            const currentQuery = this.$route.query;
            const isCurrentQuery = !!Object.keys(currentQuery).length;

            return isCurrentQuery && currentQuery.movieId == this.movieId;
        },
    },
    methods: {
        ...mapMutations("movie", ["SET_IS_DETAIL_MODAL"]),
        onClickMovieItem(event) {
            event.stopPropagation();

            // movieId 쿼리가 같은 경우
            if (this.isSameQuery) {
                console.log("movieId값이 동일하여 페이지를 이동하지 않습니다.");
                return;
            }
            //  movieId 쿼리가 다른 경우
            else {
                // 현재 라우트 경로를 유지하면서, 쿼리스트링만 변경하기
                // https://stackoverflow.com/questions/40382388/how-to-set-url-query-params-in-vue-with-vue-router/40394184

                this.SET_IS_DETAIL_MODAL(true);
                return this.$router.replace({
                    path: this.$route.path,
                    query: {
                        movieId: encodeURIComponent(this.movieId),
                    },
                });
            }
        },
    },
};
</script>

<style scoped>
.movieItem {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.movieItem figure {
    display: block;
    position: relative;
    width: 100%;
    padding-bottom: 150%;
}

.movieItem img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
</style>
