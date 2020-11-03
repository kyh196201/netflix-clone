<template>
  <div class="show">
    <!-- 타이틀 -->
    <h3 class="show__title">한국 드라마</h3>
    <!-- 스와이퍼 -->
    <div class="swiper-container movie-container">
      <div class="swiper-wrapper movie-wrapper">
        <div class="swiper-slide movie-slide">
          <div class="movie">
            <figure class="movie__thumbnail">
              <img :src="thumbnail" alt="thumbnail__img" />
            </figure>
          </div>
        </div>
        <div class="swiper-slide movie-slide">
          <div class="movie">
            <figure class="movie__thumbnail">
              <img :src="thumbnail" alt="thumbnail__img" />
            </figure>
          </div>
        </div>
        <div class="swiper-slide movie-slide">
          <div class="movie">
            <figure class="movie__thumbnail">
              <img :src="thumbnail" alt="thumbnail__img" />
            </figure>
          </div>
        </div>
        <div class="swiper-slide movie-slide">
          <div class="movie">
            <figure class="movie__thumbnail">
              <img :src="thumbnail" alt="thumbnail__img" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import thumbnail from "../assets/images/avengers.jpg";

export default {
  name: "Show",
  data() {
    return {
      thumbnail: thumbnail
    };
  }
};
</script>

<style>
.show-container .show {
  width: 100%;
  padding: 0 30px;
  border: 3px solid red;
}

.show .show__title {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
}
</style>