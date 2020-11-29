<template>
  <section class="browseHome">
    <LoadingGrid v-if="isLoading" />
    <div class="browseHome__content fadeIn" v-else>
      <!-- 백그라운드 이미지 영역 -->
      <div class="bilboard-container">
        <div class="bilboard-wrapper">
          <!-- 이미지 wrapper -->
          <div class="bilboard__image-wrapper">
            <figure class="bilboard__image">
              <img
                src="https://occ-0-1007-988.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABe5hOqOEh_QweztEJo7uV8DcG_eHpUZh-RdgPDSwUNFt0rNH_DU8N4YEGdVTnQF9pby0QeidQBmiF49vw4bTpPv7E7CC.webp?r=a83"
                alt="hero-image"
              />
            </figure>
          </div>
          <!-- 이미지 설명 영역 -->
          <div class="bilboard__meta">
            <div class="bilboard__meta__title">마약왕</div>
            <p class="bilboard__meta__synopsis">
              누군가는 노다지라고 했다. 누군가는 저승길이라고 했다.
              그저 밥벌이하겠다고 뛰어든 어둠의 세계. 그 암흑 속에서
              한 남자가 탐욕에 취해 흥청거리고 비틀거린다.
            </p>
            <div class="bilboard__meta__control">
              <button class="meta__btn btn-l btn-default">
                <font-awesome-icon icon="play" />재생
              </button>
              <button class="meta__btn btn-l btn-gray">
                <font-awesome-icon icon="info-circle" />상세 정보
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 영화 리스트 영역 -->
      <div class="movieSlider-wrapper">
        <h3 class="movieSlider-title">{{ listTitle.topRated }}</h3>
        <MovieSlider :title="listTitle.topRated" :list="topRated" />
      </div>
      <div class="movieSlider-wrapper">
        <h3 class="movieSlider-title">{{ listTitle.upComing }}</h3>
        <MovieSlider :title="listTitle.upComing" :list="upComing" />
      </div>
      <div class="movieSlider-wrapper">
        <h3 class="movieSlider-title">{{ listTitle.playing }}</h3>
        <MovieSlider :title="listTitle.playing" :list="playing" />
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import MovieSlider from "@/components/MovieSlider.vue";
import LoadingGrid from "@/components/LoadingGrid.vue";
import * as api from "../api";
import { TITLE } from "../utils/constant.js";

export default {
  name: "BrowseHome",
  components: {
    MovieSlider,
    LoadingGrid
  },
  data() {
    return {
      topRated: [],
      upComing: [],
      playing: [],
      listTitle: TITLE,
      isLoading: false
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    // 멀티 요청
    async fetchAll() {
      try {
        this.isLoading = true;
        const [topRated, upComing, playing] = await api.requestAll([
          this.fetchData("topRated"),
          this.fetchData("upComing"),
          this.fetchData("playing")
        ]);
        this.topRated = topRated && topRated.results;
        this.upComing = upComing && upComing.results;
        this.playing = playing && playing.results;
      } catch (err) {
        console.error(err);
      } finally {
        console.log("finally");
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    // api call
    async fetchData(type) {
      try {
        const res = await api.movies[type].call();
        return res;
      } catch (err) {
        console.error(err);
      } finally {
        console.log("finally");
      }
    }
  }
};
</script>

<style>
.browseHome__content {
  margin-top: -80px;
}

.bilboard-container {
  position: relative;
  /* padding-bottom: 40%; */
  /* z-index: -1; */
}

.bilboard-wrapper {
  /* position: absolute; */
  width: 100%;
  height: 56.25vh;
  background-color: #000;
}

.bilboard__image-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bilboard__image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bilboard__image > img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
}

.bilboard__meta {
  position: absolute;
  top: 50%;
  /* left: 3%; */
  left: 30px;
  transform: translate(0, -50%);
  z-index: 10;
  width: 40%;
}

.bilboard__meta__title {
  margin-bottom: 24px;
  color: #fff;
  font-size: 120px;
  font-weight: bold;
  letter-spacing: 20px;
}

.bilboard__meta__synopsis {
  max-width: 500px;
  margin-bottom: 16px;
  font-size: 18px;
  color: #fff;
  line-height: 1.5;
}

.bilboard__meta__control > button:first-child {
  margin-right: 16px;
}

.browseHome button svg {
  margin-right: 10px;
}
</style>
