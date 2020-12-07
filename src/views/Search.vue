<template>
  <section class="search">
    <loading-grid v-if="loading">Loadinggrid...</loading-grid>
    <div class="search__content">
      <search-history />
      <search-result :data="list" />
      <div v-if="loadingData">LoadingData...</div>
    </div>
  </section>
</template>

<script>
import SearchResult from "../components/SearchResult.vue";
import SearchHistory from "../components/SearchHistory.vue";
import LoadingGrid from "../components/LoadingGrid.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "search",
  components: {
    "search-result": SearchResult,
    "search-history": SearchHistory,
    "loading-grid": LoadingGrid
  },
  data() {
    return {
      currentPage: 1,
      keyword: "",
      loading: false,
      loadingData: false,
      isScrolled: false
    };
  },
  computed: {
    ...mapState({
      list: state => state.searchResult,
      totalLength: state => state.totalLength
    }),
    isQuery() {
      return !!this.$route.query.q;
    },
    currentLength() {
      return this.list.length;
    },
    isMoreData() {
      return this.totalLength > this.currentLength;
    }
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        let query = newRoute.query.q;

        if (oldRoute && oldRoute.query.q === query) {
          return;
        }

        if (!query) {
          this.$router.push("/browse");
        } else {
          this.SET_IS_SEARCHING(true);
          this.keyword = query;
          // 새로운 키워드로 검색시 항상 page값을 1로 설정해줘야한다.
          this.currentPage = 1;
          this.fetchData();
        }
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    ...mapMutations(["SET_IS_SEARCHING"]),
    ...mapActions(["SEARCH_MOVIE"]),
    async fetchData() {
      try {
        this.loading = true;
        await this.SEARCH_MOVIE({
          query: this.keyword,
          page: this.currentPage
        });
      } catch (err) {
        console.error(err);
        alert("에러 발생!!");
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    isBottom() {
      return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    },
    async onScroll(e) {
      if (this.isBottom() && !this.isScrolled && this.isMoreData) {
        this.isScrolled = true;

        this.currentPage++;

        try {
          this.loadingData = true;
          await this.SEARCH_MOVIE({
            page: this.currentPage,
            query: this.keyword
          });
        } catch (err) {
          console.error(err);
          alert("에러 발생!!");
        } finally {
          this.loadingData = false;
          setTimeout(() => {
            this.isScrolled = false;
          }, 1000);
        }
      }
    }
  }
};
</script>

<style>
.search {
  padding: 0 30px;
  min-height: 100vh;
}

.search__content {
  padding-top: 130px;
}
</style>
