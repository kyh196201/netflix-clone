<template>
    <div class="show">
        <!-- 타이틀 -->
        <h3 class="show__title">한국 드라마</h3>
        <!-- 스와이퍼 -->
        <div class="swiper-container movie-container" ref="movieSwiper">
            <!-- 스와이퍼 래퍼 -->
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
            <!-- 네비게이션 -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <!-- 스크롤 -->
            <!-- <div class="swiper-scrollbar"></div> -->
        </div>
    </div>
</template>

<script>
import thumbnail from "../assets/images/avengers.jpg";
import Swiper from "swiper";

const SLIDES_PER_VIEW = 5;
const SPACE_BETWEEN = 5;
const SPEED = 500;

const swiperOption = {
    slidesPerView: SLIDES_PER_VIEW,
    spaceBetween: SPACE_BETWEEN,
    slidesPerGroup: SLIDES_PER_VIEW,
    loop: true,
    loopFillGroupWithBlank: true,

    // pagination: {
    //     el: ".swiper-pagination",
    // },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // scrollbar: {
    //     el: ".swiper-scrollbar",
    // },
    speed: SPEED,
};

export default {
    name: "Show",
    data() {
        return {
            thumbnail: thumbnail,
            movieSwiper: null,
            swiperOption: swiperOption,
        };
    },
    mounted() {
        const target = this.$refs.movieSwiper;
        const options = this.swiperOption;

        this.movieSwiper = new Swiper(target, options);
    },
};
</script>

<style>
.show-container .show {
    width: 100%;
    margin-top: 20px;
}

.show .show__title {
    margin-bottom: 12px;
    padding: 0 30px;
    font-weight: 600;
    font-size: 18px;
    color: #fff;
}
</style>
