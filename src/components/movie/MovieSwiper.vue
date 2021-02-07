<template>
  <div class="MovieSwiper">
    <div class="swiper-container movie-container" ref="slider">
      <div class="swiper-wrapper movie-wrapper">
        <!-- 슬라이드 -->
        <div class="swiper-slide" v-for="movie in movies" :key="movie.id">
          <MovieItem :movie="movie"></MovieItem>
        </div>
      </div>
      <!-- 네비게이션 -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import MovieItem from "@/components/movie/MovieItem.vue";

export default {
  name: "MovieSlider",
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  components: {
    MovieItem,
  },
  data() {
    return {
      slider: null,
      swiperOptions: {
        slidesPerView: 7,
        spaceBetween: 10,
        slidesPerGroup: 7,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        speed: 500,
        // FIXME swiper 반응형 속성 제어
        // https://github.com/nolimits4web/swiper/blob/master/demos/380-responsive-breakpoints.html
        breakpoints: {},
      },
    };
  },
  mounted() {
    this.createSlider();
  },
  updated() {
    this.createSlider();
  },
  methods: {
    createSlider() {
      const $target = this.$refs.slider;
      this.slider = new Swiper($target, this.swiperOptions);
    },
  },
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
