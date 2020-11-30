<template>
  <div class="moviePage">
    <header class="moviePage__header">
      <div class="moviePage__header__inner">
        <div class="moviePage__header__content isGenre" v-if="selectedGenre">
          <div class="moviePage__breadcrumbs">
            <span>영화 ></span>
            <span class="moviePage__genreName">미국 영화</span>
          </div>
          <div id="sort" class="moviePgae__sort option-container">
            <button class="option-title">
              <span class="option-selected">장르</span>
              <span>&plus;</span>
            </button>
            <ul class="option-list">
              <li class="option-listItem">
                <a href="#">sort1</a>
              </li>
              <li class="option-listItem">
                <a href="#">sort1</a>
              </li>
              <li class="option-listItem">
                <a href="#">sort1</a>
              </li>
              <li class="option-listItem">
                <a href="#">sort1</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="moviePage__header__content" v-else>
          <span class="moviePage__title">영화</span>
          <div id="genre" class="moviePage__genre option-container">
            <button class="option-title" @click="isOpenGenreList = !isOpenGenreList">
              <span class="option-selected">장르</span>
              <span>&plus;</span>
            </button>
            <genre-list
              :genres="genres"
              v-show="isOpenGenreList"
              @click="selectGenre"
              @close="isOpenGenreList = false"
            ></genre-list>
          </div>
        </div>
      </div>
    </header>
    <section class="moviePage__movies">
      <h2 class="visually-hidden">영화 리스트</h2>
      <div class="moviePage__list--wrapper movieList--wrapper">
        <ul class="moviePage__list movieList">
          <li class="moviePage__listItem movieList__item"></li>
        </ul>
        <pre>
            {{ movies }}
        </pre>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GenreList from "../components/GenreList.vue";

export default {
  name: "Movie",
  components: {
    "genre-list": GenreList
  },
  data() {
    return {
      selectedGenre: "",
      isOpenGenreList: false,
      page: 1,
      title: "",
      selectedMovie: "",
      sort: ""
    };
  },
  computed: {
    ...mapState({
      movies: state => state.movies,
      genres: state => state.genres
    })
  },
  created() {
    this.fetchGenres();
    this.fetchData();
  },
  methods: {
    ...mapActions(["FETCH_MOVIES", "FETCH_GENRES"]),
    fetchData(query) {
      query = query ? query + `&page=${this.page}` : `&page=${this.page}`;
      this.FETCH_MOVIES(query);
    },
    fetchGenres() {
      this.FETCH_GENRES();
    },
    selectGenre(genre) {
      this.selectedGenre = genre;
    }
  }
};
</script>

<style>
.moviePage__header {
  width: 100%;
  height: 60px;
  background-color: var(--background-color);
}

.moviePage__header__inner {
  height: 100%;
  padding: 0 30px;
}

.moviePage__header__content {
  display: flex;
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

.option-container.moviePage__genre .option-list {
  display: flex;
  flex-wrap: wrap;
  left: 0;
  width: 300px;
}

.option-container.moviePage__genre .option-title {
  padding-right: 2rem;
}

.option-container.moviePage__genre .option-listItem {
  width: 33.3333%;
  text-align: left;
  font-size: 90%;
}

.option-container.moviePage__genre .option-listItem a {
  line-height: 1.5;
}

.option-container.moviePgae__sort .option-list {
  right: 0;
}

.moviePage__movies {
  padding: 0 30px;
}
</style>