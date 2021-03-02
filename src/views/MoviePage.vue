<template>
  <section class="movie-page">
    <h2 class="blind">영화 페이지</h2>

    <!-- 헤더 -->
    <header class="movie-page__header">
      <h3 class="blind">영화 페이지 헤더</h3>
      <div class="movie-page__header__inner">
        <!-- 헤더 왼쪽 -->
        <div class="movie-page__header__left">
          <!-- 페이지 타이틀 -->
          <div class="movie-page__title">
            <template v-if="genreList.selectedGenre">
              <span class="movie-page__subtitle" @click="clearQuery">{{
                pageName
              }}</span>
              <span class="movie-page__maintitle">{{
                genreList.selectedGenre.name
              }}</span>
            </template>

            <span class="movie-page__maintitle" v-else>{{ pageName }}</span>
          </div>

          <!-- 영화 장르 -->
          <div class="movie-page__genres">
            <div class="genres">
              <!-- 장르 셀렉터 -->
              <button
                class="genres__title"
                @click="genreList.open = !genreList.open"
              >
                장르
                <span class="genres__title__icon">
                  <font-awesome-icon icon="caret-down" />
                </span>
              </button>

              <!-- 장르 리스트 컨테이너 -->
              <div class="genres__list-container" v-if="genreList.open">
                <!-- 장르 리스트 -->
                <template v-if="genres && genres.length">
                  <template>
                    <ul
                      class="genres__list"
                      v-for="(genrelist, index) in genres"
                      :key="`genre-list-${index}`"
                    >
                      <template v-if="genrelist && genrelist.length">
                        <!-- 장르 아이템 -->
                        <li
                          class="genres__item"
                          v-for="genre in genrelist"
                          :key="`genre-id-${genre.id}`"
                          :data-genre-id="genre.id"
                        >
                          <a
                            href="#"
                            class="genres__link"
                            @click.prevent="selectGenre(genre)"
                            >{{ genre.name }}</a
                          >
                        </li>
                      </template>
                    </ul>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 헤더 오른쪽 -->
        <div class="movie-page__header__right">
          <!-- 영화 필터 -->
          <div class="movie-page__filters">
            <div class="filters">
              <!-- 필터 제목 -->
              <button class="filters__button">
                <span class="filters__title">추천 콘텐츠</span>
                <span class="filters__icon">
                  <font-awesome-icon icon="caret-down" />
                </span>
              </button>

              <!-- 필터 리스트 -->
              <div class="filters__list-container" v-if="false">
                <ul class="filters__list">
                  <li class="filters__item">
                    추천 콘텐츠
                  </li>
                  <li class="filters__item">
                    출시일순
                  </li>
                  <li class="filters__item">
                    오름차순(ㄱ-Z)
                  </li>
                  <li class="filters__item">
                    내림차순(Z-ㄱ)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 헤더 오른쪽 끝 -->
      </div>
    </header>

    <!-- 영화 리스트 -->
    <section class="movie-section">
      <h3 class="blind">영화 리스트</h3>
      <Spinner v-if="loading"></Spinner>
      <template v-else>
        <!-- 영화 리스트 -->
        <div class="movie-section__row">
          <div class="movie-list">
            <!-- 영화 아이템 -->
            <template v-if="tempMovies && tempMovies.length > 0">
              <div
                class="movie-list__item"
                v-for="movie in tempMovies"
                :key="movie.id"
              >
                <a href="#" class="movie-list__link">
                  <figure class="movie-list__poster">
                    <img :src="poster(movie.poster_path)" :alt="movie.title" />
                  </figure>
                </a>
              </div>
              <!-- <div class="movie-list__item">
              <a href="#" class="movie-list__link">
                <figure class="movie-list__poster">
                  <img
                    src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                    alt="영화 포스터"
                  />
                </figure>
              </a>
            </div>
            <div class="movie-list__item">
              <a href="#" class="movie-list__link">
                <figure class="movie-list__poster">
                  <img
                    src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                    alt="영화 포스터"
                  />
                </figure>
              </a>
            </div>
            <div class="movie-list__item">
              <a href="#" class="movie-list__link">
                <figure class="movie-list__poster">
                  <img
                    src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                    alt="영화 포스터"
                  />
                </figure>
              </a>
            </div>
            <div class="movie-list__item">
              <a href="#" class="movie-list__link">
                <figure class="movie-list__poster">
                  <img
                    src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                    alt="영화 포스터"
                  />
                </figure>
              </a>
            </div>
            <div class="movie-list__item">
              <a href="#" class="movie-list__link">
                <figure class="movie-list__poster">
                  <img
                    src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                    alt="영화 포스터"
                  />
                </figure>
              </a>
            </div>
            <div class="movie-list__item">
              <a href="#" class="movie-list__link">
                <figure class="movie-list__poster">
                  <img
                    src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                    alt="영화 포스터"
                  />
                </figure>
              </a>
            </div>
            <div class="movie-list__item">
              <a href="#" class="movie-list__link">
                <figure class="movie-list__poster">
                  <img
                    src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                    alt="영화 포스터"
                  />
                </figure>
              </a>
            </div> -->
            </template>
          </div>
        </div>
      </template>
    </section>
  </section>
</template>

<script>
// Components
import Spinner from "@/components/common/Spinner.vue";

// helpers
import { division } from "@/utils/helpers/index";
import getImageUrl from "@/utils/helpers/getImageUrl";

// APIs
import { fetchSortedMovie } from "@/api/movie";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      loading: false,

      pageName: "영화",

      // 영화 리스트
      movies: [],

      // 페이지 네이션
      pagination: {
        page: 1,
        totalPages: 0,
        totalResult: 0,
      },

      // 장르 셀렉트 박스
      genreList: {
        open: false,
        selectedGenre: null,
      },

      // 필터
      filters: {
        open: false,
        selectedFilter: null,
      },
    };
  },

  computed: {
    // 장르
    genres() {
      const genres = this.$store.getters["movie/genres"];

      return genres ? division(genres.slice(), 7) : [];
    },

    // 영화 필터
    movieFilters() {
      return this.$store.state.movie.movieFilters;
    },

    // 쿼리 스트링
    queryString() {
      return {
        with_genres: this.genreList.selectedGenre?.id,
        sort_by: this.filters.selectedFilter?.value,
        page: this.pagination.page,
      };
    },

    // 선택된 장르, 필터, 페이지를 통해 변경된 쿼리 스트링
    queryStringParams() {
      return this.qs(this.queryString);
    },

    // 임시 영화 7개로 자른 것
    tempMovies() {
      return this.movies.length ? this.movies.slice(0, 8) : [];
    },

    // 영화 포스터
    poster() {
      return (imagePath) => {
        return getImageUrl(imagePath, 2, "poster");
      };
    },
  },

  watch: {
    queryString: {
      handler(newQs, oldQs) {
        if (newQs !== oldQs) {
          this.fetchData();
        }
      },
    },
  },

  created() {
    // 쿼리스트링 설정
    this.setQueryString();

    // 데이터 fetch
    this.fetchData();
  },

  methods: {
    // 장르 선택 이벤트 핸들러
    selectGenre(genre) {
      if (!genre || (!genre.id && genre.id !== 0)) return;

      // this.$router.replace({
      //   path: this.$route.path,
      //   query: {
      //     ...this.$route.query,
      //     with_genres: genre.id,
      //   },
      // });

      this.genreList.selectedGenre = genre;
      this.genreList.open = false;
    },

    // 쿼리 스트링 만드는 함수
    qs(query) {
      let queryString = "";

      for (const key in query) {
        const _value = query[key];

        if (_value !== undefined && _value !== null && _value !== "") {
          queryString += `&${key}=${encodeURIComponent(_value)}`;
        }
      }

      return queryString.replace(/\&/, "");
    },

    // 페이지 초기 진입 시 url 쿼리로 쿼리스트링 설정
    setQueryString() {
      const { query } = this.$route;

      if (!Object.keys(query).length) return;

      // 장르 설정
      if (query["with_genres"] !== undefined) {
        const genreId = query["with_genres"];

        const genres = this.$store.getters["movie/genres"];
        const _genre = genres.find((genre) => +genre.id === +genreId);

        if (_genre) this.genreList.selectedGenre = _genre;
      }

      // 페이지 설정
      if (query.page !== undefined) {
        this.pagination.page = query.page;
      }

      // 필터 설정
      if (query.filter !== undefined) {
        const filter = this.movieFilters.find(
          (filter) => filter.value === query.filter
        );

        if (filter) this.filters.selectedFilter = filter;
      }
    },

    // 장르, 필터링 초기화
    clearQuery() {
      this.genreList.selectedGenre = null;
      this.filters.selectedFilter = null;

      // this.$router.replace({
      //   path: this.$route.path,
      //   query: {},
      // });
    },

    // 영화 불러오는 함수
    async fetchData() {
      try {
        this.loading = true;
        const _queryString = this.queryStringParams;
        const data = await fetchSortedMovie(_queryString);

        const { page, results, total_pages, total_results } = data;

        this.pagination.page = page;
        this.pagination.totalPages = total_pages;
        this.pagination.totalResult = total_results;

        this.movies = results;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* 헤더 */
.movie-page__header {
  height: 100px;
  margin: 0 0 20px 0;
}

/* 헤더 inner */
.movie-page__header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 40px;
}

.movie-page__header.fixed .movie-page__header__inner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

/* 헤더 left */
.movie-page__header__left {
  display: flex;
  align-items: center;
}

/* 페이지 타이틀 */
.movie-page__title {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.movie-page__subtitle {
  margin-right: 10px;
  color: var(--grey-color);
  font-size: 22px;
}

.movie-page__subtitle:after {
  display: inline;
  margin-left: 10px;
  content: ">";
}

.movie-page__maintitle {
  font-size: 30px;
  font-weight: bold;
  color: var(--white-color);
}

/* 영화 장르 영역 */
.movie-page__genres .genres {
  position: relative;
  color: var(--white-color);
  background-color: var(--black-color);
}

.movie-page__genres .genres__title {
  display: inline-block;
  padding: 3px 8px;
  font-size: 12px;
  color: inherit;
  background-color: inherit;
  border: 1px solid var(--white-color);
  outline: none;
  cursor: pointer;
}

.movie-page__genres .genres__title:hover,
.movie-page__genres .genres__title:focus {
  background-color: rgba(255, 255, 255, 0.3);
}

.movie-page__genres .genres__title .genres__title__icon {
  margin-left: 30px;
}

/* 장르 리스트 */
.genres__list-container {
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px;
  font-size: 0px;
  border: 1px solid var(--grey-color);
  background-color: rgba(0, 0, 0, 0.9);
  white-space: nowrap;
}

.movie-page__genres .genres__list {
  display: inline-block;
  margin-right: 30px;
  font-size: 14px;
  vertical-align: top;
}

.movie-page__genres .genres__list:last-child {
  margin-right: 0;
}

.movie-page__genres .genres__item {
  margin-bottom: 10px;
}

.movie-page__genres .genres__item:last-child {
  margin-bottom: 0;
}

.movie-page__genres .genres__link {
  display: block;
}

.movie-page__genres .genres__link:hover {
  text-decoration: underline;
}

/* 헤더 오른쪽 */
.movie-page__header__right {
  display: flex;
  align-items: center;
}

.movie-page .filters {
  position: relative;
}

.movie-page .filters__button {
  display: inline-block;
  padding: 3px 8px;
  font-size: 14px;
  background-color: var(--black-color);
  color: var(--white-color);
  border: 1px solid var(--white-color);
  outline: none;
  cursor: pointer;
}

.movie-page .filters__title {
  margin-right: 150px;
}

.movie-page .filters__list-container {
  position: absolute;
  top: 100%;
  right: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid var(--white-color);
  color: var(--white-color);
}

.movie-page .filters__list {
  min-width: 200px;
}

.movie-page .filters__item {
  font-size: 14px;
  margin-bottom: 5px;
}

.movie-page .filters__item:last-child {
  margin: 0;
}

/* 영화 섹션 */
.movie-page .movie-section {
  padding: 0 40px;
}

.movie-page .movie-list {
  font-size: 0;
  margin: 0 -10px 0 0;
}

.movie-page .movie-list__item {
  display: inline-block;
  width: calc(12.5% - 10px);
  margin: 0 10px 0 0;
}

.movie-page .movie-list__item img {
  width: 100%;
}
</style>
