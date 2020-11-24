<template>
  <div class="myList">
    This is MyList.
    <MovieCard />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";

export default {
  name: "MyList",
  components: {
    MovieCard
  }
};
</script>