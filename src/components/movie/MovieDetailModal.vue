<template>
  <MyModal class="movieDetail">
    <template v-if="isLoading">
      <MovieDetailSkeleton slot="body"></MovieDetailSkeleton>
    </template>
    <template v-else-if="!isLoading && isMovieData">
      <section slot="body" class="movieDetail__content">
        <!-- 이미지 영역 -->
        <div class="movieDetail__backdrop-wrapper">
          <BackDrop :movie="movieData" @close="onClose"></BackDrop>
        </div>
        <!-- 정보 영역 -->
        <div class="movieDetail__info-wrapper">
          <div class="movieDetail__info">
            <div>
              <div class="movieDetail__basicInfo">
                <span class="movieDetail__releaseDate">{{ releaseDate }}</span>
                <!-- <span class="movieDetail__maturity-rating">12</span> -->
                <span class="movieDetail__runTime">{{ runtime }}</span>
                <span class="movieDetail__vote">{{ vote }}</span>
              </div>
              <div class="movieDetail__overview" v-if="overview">
                {{ overview }}
              </div>
              <p v-else>줄거리가 없습니다.</p>
            </div>
            <div class="movieDetail__info__tagList">
              <!-- 영화 태그들 -->
              <MovieTagList :list="actors" title="출연"></MovieTagList>
              <MovieTagList :list="directors" title="제작"></MovieTagList>
              <MovieTagList :list="genres" title="장르"></MovieTagList>
            </div>
          </div>
        </div>
      </section>
    </template>
  </MyModal>
</template>

<script>
// components
import MyModal from "@/components/MyModal.vue";
import BackDrop from "@/components/movie/movieDetail/BackDrop.vue";
import MovieTagList from "@/components/movie/MovieTagList.vue";
import MovieDetailSkeleton from "@/components/skeleton/MovieDetailSkeleton.vue";

import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { getItem } from "@/utils/helpers/storage.js";
import { getRuntime, getReleaseDate } from "@/utils/helpers/movie.js";
import { getPrevRoute } from "@/utils/helpers/prevRoute.js";

function isEmptyObject(object) {
  return !Object.keys(object).length;
}

export default {
  name: "MovieDetailModal",
  components: {
    MyModal,
    BackDrop,
    MovieTagList,
    MovieDetailSkeleton,
  },
  data() {
    return {
      isLoading: false,
      movieId: null,
    };
  },
  computed: {
    // get state from store
    ...mapState("movie", {
      movieData: (state) => state.selectedMovie,
    }),

    // check movie data is exist
    isMovieData() {
      return this.movieData && !isEmptyObject(this.movieData);
    },

    // get movie release date
    releaseDate() {
      return this.isMovieData
        ? getReleaseDate(this.movieData.release_date)
        : "";
    },

    // get movie run time
    runtime() {
      return this.isMovieData ? getRuntime(this.movieData.runtime) : "";
    },

    // get movie vote
    vote() {
      return this.isMovieData ? this.movieData.vote_average : "";
    },

    // get movie overview
    overview() {
      return this.isMovieData ? this.movieData.overview : "";
    },

    // get movie actors
    actors() {
      return this.isMovieData ? this.movieData.cast.slice(0, 4) : [];
    },

    // get movie directors
    directors() {
      return this.isMovieData
        ? this.movieData.crew.filter((crew) => crew.job === "Director")
        : [];
    },

    // get movie genres
    genres() {
      return this.isMovieData ? this.movieData.genres : [];
    },
  },
  created() {
    this.setMovieId();
    this.fetchMovie();
  },
  methods: {
    ...mapActions("movie", ["FETCH_SELECTED_MOVIE"]),
    ...mapMutations("movie", ["SET_IS_DETAIL_MODAL"]),

    // fetch movie detail data
    async fetchMovie() {
      try {
        this.isLoading = true;
        await this.FETCH_SELECTED_MOVIE(this.movieId);
      } catch (error) {
        // 영화 상세 모달 에러 핸들링
        this.onError(error);
      } finally {
        console.log("finally");
        this.isLoading = false;
      }
    },

    // set movie id
    setMovieId() {
      this.movieId = this.$route.query.movieId;
    },

    // clear movie id
    clearMovieId() {
      this.movieId = null;
    },

    // close modal event handler
    onClose() {
      const prevRoute = this.getPrevRoute();

      this.SET_IS_DETAIL_MODAL();

      if (prevRoute) {
        this.$router.push({
          path: prevRoute.path,
          params: prevRoute.params,
          query: prevRoute.query,
        });
      } else {
        this.$router.push("/browse");
      }
    },

    // get prevRoute from localStorage
    getPrevRoute() {
      const route = getItem("prevRoute");
      return route ? JSON.parse(route) : null;
    },

    // handle error when error occurs
    onError(error) {
      // 이전 라우트 경로
      const prevRoute = getPrevRoute();
      const { response } = error;
      const resStatus = response.status;
      console.log("[resStatus in movieDetailModal] status : ", resStatus);

      this.SET_IS_DETAIL_MODAL(false);

      if (prevRoute) {
        this.$router.push(prevRoute);
      } else {
        this.$router.push("/browse");
      }
    },
  },
};
</script>

<style>
.movieDetail__content {
  background-color: #292929;
  color: var(--white-color);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.movieDetail__info {
  display: flex;
  padding: 2rem 3rem;
  font-size: 1.5rem;
}

.movieDetail__info div:first-child {
  flex-basis: 70%;
  padding-right: 1rem;
}

.movieDetail__basicInfo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  font-weight: bold;
}

.movieDetail__releaseDate {
  color: var(--release-date-color);
}

.movieDetail__releaseDate,
.movieDetail__maturity-rating,
.movieDetail__runTime,
.movieDetail__vote {
  margin-right: 1rem;
  font-size: 1em;
}
.movieDetail__vote {
  color: var(--vote-color);
}

.movieDetail__overview {
  word-break: keep-all;
  line-height: 1.5;
  font-size: 1.25em;
}

.movieDetail__info__tagList .movie-tagList:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>
