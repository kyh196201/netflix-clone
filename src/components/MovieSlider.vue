<template>
  <div class="movieSlider">
    <!-- 스와이퍼 -->
    <template v-if="list && list.length">
      <div class="swiper-container movie-container" ref="movieSwiper">
        <!-- 스와이퍼 래퍼 -->
        <div class="swiper-wrapper movie-wrapper">
          <div class="swiper-slide movie-slide" v-for="movie in list" :key="movie.id">
            <MovieItem :data="movie" />
          </div>
        </div>
        <!-- 네비게이션 -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </template>
    <div v-else>DataBase Error</div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { SLIDES_PER_VIEW, SPACE_BETWEEN, SPEED } from "../utils/constant.js";
import MovieItem from "./MovieItem.vue";

const swiperOption = {
  slidesPerView: SLIDES_PER_VIEW,
  spaceBetween: SPACE_BETWEEN,
  slidesPerGroup: SLIDES_PER_VIEW,
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  // scrollbar: {
  //     el: ".swiper-scrollbar",
  // },
  speed: SPEED
};

export default {
  name: "MovieSlider",
  props: ["list", "isSlider"],
  components: {
    MovieItem
  },
  data() {
    return {
      movieSwiper: null,
      swiperOption: swiperOption
    };
  },
  computed: {
    isList() {
      return this.list && this.list.length;
    }
  },
  mounted() {
    const target = this.$refs.movieSwiper;
    const options = this.swiperOption;
    if (this.isList && this.isSlider) {
      this.movieSwiper = new Swiper(target, options);
    }
  },
  updated() {
    const target = this.$refs.movieSwiper;
    const options = this.swiperOption;

    if (this.isList && this.isSlider) {
      this.movieSwiper = new Swiper(target, options);
    }
  }
};
</script>

<style>
.movieSlider-wrapper {
  padding: 0 3rem;
}

.movieSlider {
  position: relative;
  width: 100%;
}

.movieSlider-title {
  font-weight: 600;
  font-size: 18px;
  color: #fff;
}
</style>
