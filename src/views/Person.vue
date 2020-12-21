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
          <MovieGrid :data="movieList"></MovieGrid>
        </div>
        <p class="personPage__message" v-else>해당 인물에 대한 영화 리스트가 없습니다.</p>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import MovieGrid from "@/components/MovieGrid.vue";

export default {
  name: "Person",
  components: {
    MovieGrid
  },
  data() {
    return {
      isLoading: false,
      pid: null
    };
  },
  computed: {
    ...mapState({
      movieList: state => state.personMovieList,
      actorName: state => state.personActorName
    })
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        this.pid = newRoute.params.pid;

        if (this.pid === undefined || this.pid === null) {
          this.goPrev();
        } else {
          if (oldRoute && this.pid === oldRoute.params.pid) {
            return;
          }

          this.fetchMovies();
        }
      },
      immediate: true
    }
  },
  destroyed() {
    this.SET_ACTOR_NAME("");
  },
  methods: {
    ...mapActions(["FETCH_PERSON_MOVIES"]),
    ...mapMutations(["SET_ACTOR_NAME"]),
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

<style>
.personPage__header {
  margin: 0 0 3rem 0;
  padding: 0 3rem;
}

.personPage__actorName {
  font-size: 2.4rem;
  font-weight: bold;
  color: #fff;
}
</style>