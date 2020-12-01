<template>
  <div class="moviePage">
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
            <button class="option-title">
              <span class="option-selected">장르</span>
              <span class="option-icon">
                <font-awesome-icon icon="caret-down" />
              </span>
            </button>
            <ul class="optionList column">
              <li class="optionList__item">
                <a href="#">sort1</a>
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GenreList from "../components/GenreList.vue";
import MovieCard from "../components/MovieCard.vue";

export default {
  name: "Movie",
  components: {
    "genre-list": GenreList,
    "movie-card": MovieCard
  },
  data() {
    return {
      page: 1,
      isOpenGenreList: false,
      genre: null
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
    }
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route;

        if (query && query.id) {
          this.genre = query.id;
        } else {
          this.genre = null;
        }

        if (query && query.sort) {
          this.sort = query.sort;
        } else {
          this.sort = null;
        }

        const queryString = this.getMovieQuery(this.genre, this.sort);

        console.log(queryString);

        this.fetchMovies(queryString);
      },
      immediate: true
    }
  },
  created() {
    this.fetchGenres();
  },
  methods: {
    ...mapActions(["FETCH_MOVIES", "FETCH_GENRES"]),
    fetchMovies(query) {
      query = query ? query + `&page=${this.page}` : `&page=${this.page}`;
      this.FETCH_MOVIES(query);
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
      this.goRoute(path, query);
    },
    goRoute(path, query) {
      this.$router.push({
        path,
        query
      });
    },
    getMovieQuery(genre, sort) {
      let queryString = "";

      if (genre && sort) {
        queryString = `with_genres=${genre}&sort_by=${sort}`;
      } else if (genre && !sort) {
        queryString = `with_genres=${genre}`;
      } else if (!genre && sort) {
        queryString = `sort_by=${sort}`;
      }

      return queryString;
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