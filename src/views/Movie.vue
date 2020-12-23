<template>
  <div class="moviePage">
    <LoadingGrid v-if="loading"></LoadingGrid>
    <template v-else>
      <header class="moviePage__header">
        <div class="moviePage__header__inner">
          <!-- 장르 선택되었을 경우 -->
          <div class="moviePage__header__content isGenre" v-if="selectedGrenre">
            <div class="moviePage__breadcrumbs breadcrumbs">
              <span class="breadcrumbs__depth zero-depth">
                <router-link to="/browse/movie">영화</router-link>
              </span>
              <span class="breadcrumbs__depth current">
                <router-link :to="`/browse/movie?id=${selectedGrenre.id}`">{{ selectedGrenre.name }}</router-link>
              </span>
            </div>
            <div class="moviePage__sort option-container">
              <button class="option-title" @click="isOpenFilter = !isOpenFilter">
                <span class="option-selected">{{ getFilterTitle }}</span>
                <span class="option-icon">
                  <font-awesome-icon icon="caret-down" />
                </span>
              </button>
              <ul class="optionList column" v-if="isOpenFilter">
                <li class="optionList__item" v-for="(filter, index) in filters" :key="index">
                  <a href="#" @click.prevent="selectSort(filter.name)">{{filter.title}}</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 장르 선택하기 전 -->
          <div class="moviePage__header__content" v-else>
            <span class="moviePage__title">영화</span>
            <div class="moviePage__genres option-container">
              <button class="option-title" @click="isOpenGenreList = !isOpenGenreList">
                <span class="option-selected">장르</span>
                <span class="option-icon">
                  <font-awesome-icon icon="caret-down" />
                </span>
              </button>
              <genre-list :genres="genres" v-if="isOpenGenreList" @click="selectGrenre"></genre-list>
            </div>
          </div>
        </div>
      </header>
      <section class="moviePage__movies">
        <h2 class="hidden-title">영화 리스트</h2>
        <div class="moviePage__list--wrapper movieList--wrapper">
          <ul class="moviePage__list movieList">
            <li class="moviePage__listItem movieList__item" v-for="movie in movies" :key="movie.id">
              <movie-card :data="movie"></movie-card>
            </li>
          </ul>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GenreList from "../components/GenreList.vue";
import MovieCard from "../components/MovieCard.vue";
import LoadingGrid from "@/components/LoadingGrid.vue";
import throttle from "../utils/throttle.js";
import debounce from "../utils/debounce.js";

const filters = [
  {
    name: "po",
    title: "인기 순",
    query: "popularity.desc"
  },
  {
    name: "yr",
    title: "출시일 순",
    query: "release_date.desc"
  },
  {
    name: "av",
    title: "평점 높은 순",
    query: "vote_averatge.desc"
  }
];

export default {
  name: "Movie",
  components: {
    "genre-list": GenreList,
    "movie-card": MovieCard,
    LoadingGrid: LoadingGrid
  },
  data() {
    return {
      page: 1,
      isOpenGenreList: false,
      genre: null,
      filters: filters,
      isOpenFilter: false,
      sort: null,
      isFetchingDataByScrolling: false,
      prevScrollPos: window.scrollY,
      loading: false,
      throttledOnScroll: throttle(this.onScroll, 250)
    };
  },
  computed: {
    ...mapState({
      movies: state => state.movies,
      genres: state => state.genres
    }),
    selectedGrenre() {
      return this.genre
        ? this.genres.find(genre => genre.id == this.genre)
        : null;
    },
    getFilterTitle() {
      return this.sort
        ? this.filters.find(f => f.name === this.sort).title
        : "필터를 선택하세요";
    },
    getFilter() {
      return this.sort
        ? this.filters.find(f => f.name === this.sort).query
        : "";
    },
    queryString() {
      const { genre, sort, page } = this;
      let queryString = `page=${page}`;

      if (genre) {
        queryString = queryString + `&with_genres=${genre}`;
      }

      if (sort) {
        queryString = queryString + `&sort_by=${this.getFilter}`;
      }
      return queryString;
    },
    query() {
      return this.$route.query;
    }
  },
  watch: {
    // $route: {
    //   handler(newRoute, oldRoute) {
    //     const { query } = newRoute;

    //     this.clearPage();

    //     if (query && query.id) {
    //       this.genre = query.id;
    //     } else {
    //       this.genre = null;
    //     }

    //     if (query && query.sort) {
    //       this.sort = query.sort;
    //     } else {
    //       this.sort = null;
    //     }

    //     this.fetchMovies(this.queryString);
    //   },
    //   immediate: true
    // }
    query: {
      handler: function(newVal, oldVal) {
        if (!this.checkIsSameQuery(newVal, oldVal)) {
          this.genre = newVal.id ? newVal.id : null;
          this.sort = newVal.sort ? newVal.sort : null;
          this.fetchMovies(this.queryString);
        } else {
          console.log("modal opened and not load movie data");
          return;
        }
      },
      immediate: true
    }
  },
  created() {
    this.fetchGenres();
  },
  mounted() {
    this.setScrollEvent();
  },
  destroyed() {
    this.unSetScrollEvent();
  },
  methods: {
    ...mapActions(["FETCH_MOVIES", "FETCH_GENRES", "FETCH_PAGINATION_MOVIES"]),
    async fetchMovies(query = "") {
      this.loading = true;
      await this.FETCH_MOVIES(query);
      this.loading = false;
    },
    fetchGenres() {
      this.FETCH_GENRES();
    },
    selectGrenre(genre) {
      const { path } = this.$route;
      const query = {
        id: genre
      };

      this.isOpenGenreList = false;
      this.sort = null;
      this.page = 1;
      this.changeRoute(path, query);
    },
    changeRoute(path, query) {
      this.$router.push({
        path,
        query
      });
    },
    selectSort(sort) {
      if (!this.genre) {
        console.error("장르가 선택되어어야합니다.");
        return;
      }

      const { path } = this.$route;
      const query = {
        id: this.genre,
        sort: sort
      };

      this.page = 1;
      this.changeRoute(path, query);
      this.isOpenFilter = false;
    },
    setScrollEvent() {
      document.addEventListener("scroll", this.throttledOnScroll);
    },
    unSetScrollEvent() {
      document.removeEventListener("scroll", this.throttledOnScroll);
    },
    async onScroll(e) {
      const direction = this.getScrollDirection();

      this.prevScrollPos = window.scrollY;

      if (this.isFetchingDataByScrolling) return false;

      const isBottom = this.isBottom();

      if (isBottom) {
        if (direction === "UP") return;

        this.isFetchingDataByScrolling = true;
        // console.log("여기서 데이터를 로드합니다.");
        await this.fetchOnScroll();
        this.isFetchingDataByScrolling = false;
      }
    },
    isBottom() {
      const body = document.body;
      // 브라우저 높이
      const browserHeight = Math.max(window.innerHeight, body.clientHeight);
      //   스크롤한 높이
      const scrollY = window.scrollY || window.pageYOffset;
      //   문서 총 높이
      const documentHeight = body.scrollHeight;

      return documentHeight * 0.9 <= browserHeight + scrollY;
    },
    getScrollDirection() {
      if (this.prevScrollPos < window.scrollY) {
        return "DOWN";
      } else {
        return "UP";
      }
    },
    async fetchOnScroll() {
      this.page = this.page + 1;

      //   데이터 fetch
      await this.FETCH_PAGINATION_MOVIES(this.queryString);
    },
    clearPage() {
      this.page = 1;
    },
    checkIsSameQuery(query1, query2) {
      const field = ["id", "sort"];
      let isSame = true;

      if (!query1 || !query2) {
        return false;
      }

      for (let key of field) {
        if (query1[key] !== query2[key]) {
          isSame = false;
        }
      }

      return isSame;
    }
  }
};
</script>

<style>
.moviePage__header {
  width: 100%;
  margin-bottom: 2rem;
  background-color: var(--background-color);
}

.moviePage__header__inner {
  padding: 0 30px;
}

.moviePage__header__content {
  display: flex;
  height: 60px;
  align-items: center;
  color: var(--white-color);
}

.moviePage__header__content.isGenre {
  justify-content: space-between;
}

.moviePage__title {
  font-size: 2rem;
  font-weight: bold;
  margin-right: 3rem;
}

.moviePage__genres .option-selected {
  margin-right: 2rem;
}

.moviePage__sort .option-selected {
  margin-right: 5rem;
}

.moviePage__sort .optionList {
  width: 100%;
}

.moviePage__movies {
  padding: 0 30px;
}

.moviePage .movieCard {
  max-width: 100%;
}
</style>