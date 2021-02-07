<template>
  <section class="browse">
    <router-view></router-view>
    <MovieCard v-if="isMovieCard"></MovieCard>
  </section>
</template>

<script>
import MovieCard from "@/components/movie/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  computed: {
    isMovieCard() {
      return this.$store.state.movie.isMovieCard;
    },
  },
  created() {
    console.log("[Browse] created!!");
  },
};
</script>

<style>
.browse {
  background-color: #141414;
}
</style>
