<template>
  <div class="movieGrid">
    <ul class="movieGrid__list">
      <li class="movieGrid__listItem" v-for="(movie, index) in data" :key="index">
        <MovieItem class="fadeIn" :data="movie"></MovieItem>
      </li>
    </ul>
  </div>
</template>
<script>
import MovieItem from "./MovieItem.vue";

export default {
  name: "MovieGrid",
  props: ["data"],
  components: {
    MovieItem
  }
};
</script>
<style>
.movieGrid {
  padding: 0 30px;
}

.movieGrid__list {
  margin: 0 -1rem;
}

.movieGrid__list:after {
  display: block;
  clear: both;
  content: "";
}

.movieGrid__listItem {
  float: left;
  width: 15%;
  height: 250px;
  margin: 0 1rem 1.5rem;
}

.movieGrid .movie {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.2s linear;
}

.movieGrid .movie:hover {
  transform: scale(1.1);
}

.movieGrid .movie__thumbnail {
  width: 100%;
  height: 100%;
}

.movieGrid .movie__thumbnail > img {
  width: auto;
  max-height: 100%;
}
</style>