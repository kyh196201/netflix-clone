<template>
  <section class="browseHome">
    <div class="browseHome__content fadeIn">
      <!-- 매인 영화 영역 -->
      <MainMovie></MainMovie>
      <!-- 영화 리스트 영역 -->
      <div class="movieSlider-wrapper">
        <h3 class="movieSlider-title">{{ listTitle.topRated }}</h3>
        <MovieSlider :title="listTitle.topRated" :list="topRated" :is-slider="true" />
      </div>
      <div class="movieSlider-wrapper">
        <h3 class="movieSlider-title">{{ listTitle.upComing }}</h3>
        <MovieSlider :title="listTitle.upComing" :list="upComing" :is-slider="true" />
      </div>
      <div class="movieSlider-wrapper">
        <h3 class="movieSlider-title">{{ listTitle.playing }}</h3>
        <MovieSlider :title="listTitle.playing" :list="playing" :is-slider="true" />
      </div>
      <!-- <Trailer v-if="isTrailer" @close="isTrailer = false" :movie-id="mainMovie.id" /> -->
      <!-- <router-view></router-view> -->
    </div>
  </section>
</template>

<script>
import MainMovie from "@/components/MainMovie.vue";
import MovieSlider from "@/components/MovieSlider.vue";
import Trailer from "@/components/Trailer.vue";
import * as api from "@/api";
import { TITLE, getBackdrop } from "@/utils/constant.js";
import { mapState, mapMutations } from "vuex";
import { getRandomNumber } from "@/utils/helpers.js";

export default {
  name: "BrowseHome",
  components: {
    MainMovie,
    MovieSlider,
    Trailer
  },
  data() {
    return {
      topRated: [],
      upComing: [],
      playing: [],
      listTitle: TITLE,
      // 선택된 메인 영화
      mainMovie: null,
      isTrailer: false
    };
  },
  computed: {
    ...mapState({
      isMovieDetail: state => state.isMovieDetail,
      isLoading: state => state.loading
    }),
    mainPoster() {
      return this.mainMovie ? getBackdrop(this.mainMovie.backdrop_path) : "";
    }
  },
  async created() {
    // 영화 데이터 로드
    await this.fetchAll();
    // 메인 영화 선택
    this.setMainMovie();
  },
  methods: {
    ...mapMutations(["SET_IS_MOVIE_DETAIL", "SET_LOADING"]),
    // 멀티 요청
    async fetchAll() {
      try {
        this.SET_LOADING(true);
        const [topRated, upComing, playing] = await api.requestAll([
          this.fetchMovie("topRated"),
          this.fetchMovie("upComing"),
          this.fetchMovie("playing")
        ]);
        this.topRated = topRated && topRated.results;
        this.upComing = upComing && upComing.results;
        this.playing = playing && playing.results;
      } catch (err) {
        console.error(err);
      } finally {
        this.SET_LOADING(false);
      }
    },
    async fetchMovie(type) {
      try {
        const res = await api.movies[type].call();
        return res;
      } catch (err) {
        console.error(err);
      }
    },
    setMainMovie() {
      const playing = this.playing;

      if (!playing.length) {
        console.error("playing length error");
        return;
      }

      const randomIndex = getRandomNumber(playing.length);

      if (randomIndex < 0 || randomIndex >= playing.length) {
        console.error("randomIndex error");
        return;
      }

      //FIXME playing => topRated로 임시 교체
      this.mainMovie = this.topRated[randomIndex] || null;
    },
    goDetail(id) {
      const { path, query, params } = this.$route;

      const newQuery = {
        ...query,
        jbv: id
      };

      this.$router.push({
        path: path,
        query: newQuery,
        params: params
      });

      this.SET_IS_MOVIE_DETAIL(true);
    },
    // 예고편 모달창 여는 함수
    showTrailer() {
      this.isTrailer = true;
    }
  }
};
</script>

<style>
.browseHome__content {
  margin-top: -8rem;
}

.browseHome button svg {
  margin-right: 1rem;
}
</style>
