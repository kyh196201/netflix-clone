<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <footer>Footer</footer>
    <DetailView v-if="isMovieDetail" />
    <LoadingPage v-if="isLoading"></LoadingPage>
  </div>
</template>

<script>
import Header from "./components/common/Header.vue";
import DetailView from "./views/DetailView.vue";
import LoadingPage from "@/components/common/LoadingPage.vue";
import { mapState } from "vuex";
import { setYoutubeAPI } from "@/utils/youtube.js";

export default {
  components: {
    Header,
    DetailView,
    LoadingPage
  },
  computed: {
    ...mapState({
      isMovieDetail: state => state.isMovieDetail,
      isLoading: state => state.loading
    })
  },
  created() {
    setYoutubeAPI();
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>
