<template>
  <section class="personPage">
    <h2 class="blind">배우 출연 작품</h2>
    <div class="personPage__content">
      <header class="personPage__header">
        <span class="personPage__actorName">{{ actorName }}</span>
      </header>
      <div v-if="isLoading">Loading..</div>
      <template v-else>
        <div class="personPage__movieList" v-if="movieList.length">
          <div class="personPage__movieSlider">{{ movieList }}</div>
        </div>
        <p class="personPage__message" v-else>영화 리스트가 없습니다.</p>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Person",
  data() {
    return {
      isLoading: false,
      actorName: "",
      pid: null
    };
  },
  computed: {
    ...mapState({
      movieList: state => state.personMovieList
    })
  },
  watch: {
    $route: {
      handler(newRoute) {
        this.pid = newRoute.params.pid;

        if (this.pid === undefined || this.pid === null) {
          this.goPrev();
        } else {
          this.fetchMovies();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["FETCH_PERSON_MOVIES"]),
    async fetchMovies() {
      try {
        this.isLoading = true;
        await this.FETCH_PERSON_MOVIES(this.pid);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    }
  },
  goPrev() {
    let prevRoute = localStorage.getItem("prevRoute");
    prevRoute = prevRoute ? JSON.parse(prevRoute) : "/";

    const { params, path, query } = prevRoute;

    this.$router.push({
      path,
      params,
      query
    });
  }
};
</script>