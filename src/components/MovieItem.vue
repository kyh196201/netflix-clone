<template>
  <router-link :to="nextPath" class="movie" data-movie-id="data.id">
    <figure class="movie__thumbnail">
      <img :src="imagePath" alt="thumbnail__img" />
    </figure>
  </router-link>
</template>

<script>
import { POSTER_PATH } from "../utils/constant.js";

export default {
  name: "MovieItem",
  props: ["data"],
  data() {
    return {
      posterPath: POSTER_PATH,
      currentPath: ""
    };
  },
  computed: {
    imagePath() {
      return this.posterPath + this.data.poster_path;
    },
    nextPath() {
      return this.currentPath + `/detail/${this.data.id}`;
    }
  },
  created() {
    this.currentPath = this.$route.fullPath;
  }
};
</script>