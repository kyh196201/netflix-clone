<template>
  <div class="myList">
    <LoadingGrid v-if="isLoading" />
    <MovieCard />
    <MovieCard />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import LoadingGrid from "../components/LoadingGrid.vue";

export default {
  name: "MyList",
  components: {
    MovieCard,
    LoadingGrid
  },
  data() {
    return {
      isLoading: false
    };
  }
};
</script>

<style>
.myList {
  width: 100%;
}
</style>