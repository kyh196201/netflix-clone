<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <footer>Footer</footer>
    <MovieDetailModal v-if="isDetailModal" />
    <LoadingPage v-if="isLoading"></LoadingPage>
  </div>
</template>

<script>
import Header from "./components/common/Header.vue";
import MovieDetailModal from "@/components/movie/MovieDetailModal.vue";
import LoadingPage from "@/components/common/LoadingPage.vue";
import { mapState } from "vuex";
import { setYoutubeAPI } from "@/utils/youtube.js";

export default {
  components: {
    Header,
    MovieDetailModal,
    LoadingPage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.loading,
    }),
    ...mapState("movie", {
      isDetailModal: (state) => state.isDetailModal,
    }),
  },
  created() {
    setYoutubeAPI();

    console.log("App.vue Created!!");

    // init user list store
    this.$store.dispatch("user/INIT_USER_LIST");

    // init movie store
    this.$store.dispatch("movie/INIT_MOVIE_STORE");
  },
};
</script>

<style>
@import "./assets/css/styles.css";
</style>
