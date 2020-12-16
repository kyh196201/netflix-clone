<template>
  <section class="browseHome">
    <LoadingGrid v-if="isLoading" />
    <div class="browseHome__content fadeIn" v-else>
      <!-- 매인 영화 영역 -->
      <div class="bilboard-container" v-if="mainMovie" R>
        <div class="bilboard-wrapper">
          <!-- 영화 포스터 -->
          <div class="bilboard__image-wrapper">
            <figure class="bilboard__image">
              <img :src="mainPoster" :alt="mainMovie.title" />
            </figure>
          </div>
        </div>
        <div class="bilboard-meta-wrapper">
          <!-- 영화 정보 영역 -->
          <div class="bilboard__meta">
            <div :class="mainTitleClass">{{ mainMovie.title }}</div>
            <p class="bilboard__meta__synopsis">{{ mainMovie.overview }}</p>
            <div class="bilboard__meta__control">
              <button
                type="button"
                class="meta__btn btn-l btn-default meta__playBtn"
                :data-movie-id="mainMovie.id"
                @click="showTrailer"
              >
                <font-awesome-icon icon="play" />재생
              </button>
              <button
                type="button"
                class="meta__btn btn-l btn-gray meta__detailBtn"
                :data-movie-id="mainMovie.id"
                @click.prevent="goDetail(mainMovie.id)"
              >
                <font-awesome-icon icon="info-circle" />상세 정보
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <Trailer v-if="isTrailer" @close="isTrailer = false" :movie-id="mainMovie.id" />
      <!-- <router-view></router-view> -->
    </div>
  </section>
</template>

<script>
import MovieSlider from "@/components/MovieSlider.vue";
import LoadingGrid from "@/components/LoadingGrid.vue";
import Trailer from "@/components/Trailer.vue";
import * as api from "@/api";
import { TITLE, getBackdrop } from "@/utils/constant.js";
import { mapState, mapMutations } from "vuex";
import { getRandomNumber } from "@/utils/helpers.js";

export default {
  name: "BrowseHome",
  components: {
    MovieSlider,
    LoadingGrid,
    Trailer
  },
  data() {
    return {
      topRated: [],
      upComing: [],
      playing: [],
      listTitle: TITLE,
      isLoading: false,
      // 선택된 메인 영화
      mainMovie: null,
      isTrailer: false
    };
  },
  computed: {
    ...mapState({
      isMovieDetail: state => state.isMovieDetail
    }),
    mainPoster() {
      return this.mainMovie ? getBackdrop(this.mainMovie.backdrop_path) : "";
    },
    mainTitleClass() {
      return {
        bilboard__meta__title: true,
        long: this.mainMovie.title && this.mainMovie.title.length >= 10
      };
    }
  },
  async created() {
    // 영화 데이터 로드
    await this.fetchAll();
    // 메인 영화 선택
    this.setMainMovie();
  },
  methods: {
    ...mapMutations(["SET_IS_MOVIE_DETAIL"]),
    // 멀티 요청
    async fetchAll() {
      try {
        this.isLoading = true;
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
        this.isLoading = false;
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

.bilboard-container {
  position: relative;
  padding-bottom: 40%;
}

.bilboard-wrapper,
.bilboard-meta-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.bilboard-meta-wrapper {
  background-color: transparent;
  background: linear-gradient(to top, #181818, transparent 50%);
}

.bilboard__image-wrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.bilboard__image {
  width: 100%;
  height: 100%;
}

.bilboard__image > img {
  width: 100%;
  height: 100%;
}

.bilboard__meta {
  position: absolute;
  top: 50%;
  left: 0;
  padding: 0 3rem;
  transform: translate(0, -40%);
  z-index: 10;
  width: 100%;
}

.bilboard__meta__title {
  overflow: hidden;
  margin-bottom: 2.4rem;
  width: 100%;
  color: #fff;
  font-size: 10rem;
  font-weight: bold;
  letter-spacing: 20px;
  white-space: nowrap;
}

.bilboard__meta__title.long {
  font-size: 5rem;
}

.bilboard__meta__synopsis {
  max-width: 50rem;
  margin-bottom: 1.6rem;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1.5;
  max-height: 7.5em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.bilboard__meta__control > button:first-child {
  margin-right: 1.6rem;
}

.bilboard__meta__control button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
}

.browseHome button svg {
  margin-right: 1rem;
}
</style>
