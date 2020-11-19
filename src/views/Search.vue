<template>
  <section class="search">
    <loading-page v-if="loadingPage">LoadingPage...</loading-page>
    <search-history />
    <search-result :data="list" />
    <div v-if="loadingData">LoadingData...</div>
  </section>
</template>

<script>
import SearchResult from "../components/SearchResult.vue";
import SearchHistory from "../components/SearchHistory.vue";
import LoadingPage from "../components/LoadingPage.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "search",
  components: {
    "search-result": SearchResult,
    "search-history": SearchHistory,
    "loading-page": LoadingPage
  },
  data() {
    return {
      currentPage: 1,
      keyword: "",
      loadingPage: false,
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
      handler(value) {
        let queryString = value.query.q;

        if (!queryString) {
          this.$router.push("/browse");
        } else {
          this.SET_IS_SEARCHING(true);
          this.keyword = decodeURIComponent(queryString);
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
        this.loadingPage = true;
        await this.SEARCH_MOVIE({
          query: this.keyword,
          page: this.currentPage
        });
      } catch (err) {
        console.error(err);
        alert("에러 발생!!");
      } finally {
        // setTimeout(() => {
        //     this.loadingPage = true;
        // }, 1000);
        this.loadingPage = false;
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
  padding: 130px 30px 0;
  min-height: 100vh;
}
</style>
