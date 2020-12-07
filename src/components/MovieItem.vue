<template>
  <a href="#" class="movie" data-movie-id="data.id" @click.prevent="goDetail(data.id)">
    <figure class="movie__thumbnail">
      <img :src="imagePath" alt="thumbnail__img" />
    </figure>
  </a>
</template>

<script>
import { POSTER_PATH } from "../utils/constant.js";
import { mapMutations } from "vuex";

export default {
  name: "MovieItem",
  props: ["data"],
  data() {
    return {
      posterPath: POSTER_PATH
    };
  },
  computed: {
    imagePath() {
      return this.posterPath + this.data.poster_path;
    }
  },
  methods: {
    ...mapMutations(["SET_IS_MOVIE_DETAIL"]),
    goDetail(id) {
      this.SET_IS_MOVIE_DETAIL(true);

      const { path, query, params } = this.$route;
      const newQuery = {
        ...query,
        jbv: id
      };

      this.$router.push({
        path: path,
        query: newQuery
      });
    }
  }
};
</script>