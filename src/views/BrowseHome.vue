<template>
  <section class="browseHome">
    <div class="browseHome__content fadeIn">
      <!-- 매인 영화 영역 -->
      <MainMovie :id="mainMovieId"></MainMovie>
      <!-- 영화 리스트 영역 -->
      <MovieSlide
        category-title="높은 평점"
        category-id="top_rated"
      ></MovieSlide>
      <MovieSlide
        category-title="상영중"
        category-id="now_playing"
      ></MovieSlide>
      <MovieSlide
        category-title="개봉 예정"
        category-id="upcoming"
      ></MovieSlide>
    </div>
  </section>
</template>

<script>
import MainMovie from "@/components/MainMovie.vue";
import { mapState, mapMutations } from "vuex";
import MovieSlide from "@/components/movie/MovieSlide.vue";

export default {
  name: "BrowseHome",
  components: {
    MainMovie,
    MovieSlide,
  },
  data() {
    return {
      mainMovieId: 372058,
    };
  },
  computed: {
    ...mapState({
      isMovieDetail: (state) => state.isMovieDetail,
    }),
  },
  methods: {
    ...mapMutations(["SET_IS_MOVIE_DETAIL"]),
  },
};
</script>

<style>
.browseHome__content {
  margin-top: -8rem;
}

.browseHome button svg {
  margin-right: 1rem;
}
</style>
