<template>
  <section class="latest">
    <h2 class="blind">최신 영화</h2>
    <div class="latest__content">
      <MovieCard></MovieCard>
    </div>
  </section>
</template>

<script>
import MovieCard from "@/components/movie/MovieCard.vue";

export default {
  name: "Latest",
  components: {
    MovieCard,
  },
};
</script>

<style>
.latest {
  padding: 0 20px;
}
</style>
