<template>
  <div class="movieSlide">
    <h3 class="movieSlide__title">{{ categoryTitle }}</h3>
    <template v-if="isLoading">
      <!-- spinner -->
      <Spinner></Spinner>
    </template>
    <template v-else>
      <div class="movieSlide__movies" v-if="isMovies">
        <MovieSwiper :movies="movies"></MovieSwiper>
      </div>
      <div v-else>카테고리에 해당하는 영화가 없습니다.😂</div>
    </template>
  </div>
</template>

<script>
import MovieSwiper from "@/components/movie/MovieSwiper.vue";
import Spinner from "@/components/common/Spinner.vue";
import { movieCategories } from "@/utils/constants/movie";
import { fetchMovies } from "@/api";

export default {
  props: {
    categoryTitle: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
      validator: function(category) {
        return movieCategories.includes(category);
      },
    },
  },
  components: {
    MovieSwiper,
    Spinner,
  },
  computed: {
    isMovies() {
      return this.movies && this.movies.length;
    },
  },
  data() {
    return {
      isLoading: false,
      movies: [],
      page: 1,
      totalPages: 0,
      totalResult: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const { data } = await fetchMovies(this.categoryId);

        this.movies = data.results;
        this.totalPages = data["total_pages"];
        this.totalResult = data["total_results"];
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.movieSlide {
  padding: 0 30px;
  margin-bottom: 2rem;
}

.movieSlide__title {
  color: var(--white-color);
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
