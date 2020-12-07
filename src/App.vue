<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <footer>Footer</footer>
    <DetailView v-if="isMovieDetail" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import DetailView from "./views/DetailView.vue";
import { mapState } from "vuex";

export default {
  components: {
    Header,
    DetailView
  },
  computed: {
    ...mapState({
      isMovieDetail: state => state.isMovieDetail
    })
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>
