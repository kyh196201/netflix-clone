<template>
    <div class="show">
        <!-- 타이틀 -->
        <h3 class="show__title">{{ title }}</h3>
        <!-- 스와이퍼 -->
        <template v-if="list && list.length">
            <div class="swiper-container movie-container" ref="movieSwiper">
                <!-- 스와이퍼 래퍼 -->
                <div class="swiper-wrapper movie-wrapper">
                    <div
                        class="swiper-slide movie-slide"
                        v-for="movie in list"
                        :key="movie.id"
                    >
                        <div class="movie">
                            <figure class="movie__thumbnail">
                                <img
                                    :src="getImageUrl(movie.poster_path)"
                                    alt="thumbnail__img"
                                />
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
        </template>
        <div v-else>DataBase Error</div>
    </div>
</template>

<script>
import thumbnail from "../assets/images/avengers.jpg";
import Swiper from "swiper";
import {
    SLIDES_PER_VIEW,
    SPACE_BETWEEN,
    SPEED,
    IMG_PATH,
} from "../utils/constant.js";

const swiperOption = {
    slidesPerView: SLIDES_PER_VIEW,
    spaceBetween: SPACE_BETWEEN,
    slidesPerGroup: SLIDES_PER_VIEW,
    loop: true,
    loopFillGroupWithBlank: true,
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
    props: ["title", "list"],
    data() {
        return {
            thumbnail: thumbnail,
            movieSwiper: null,
            swiperOption: swiperOption,
            imgPath: IMG_PATH,
        };
    },
    mounted() {
        // const target = this.$refs.movieSwiper;
        // const options = this.swiperOption;
        // if (this.list && this.list.length) {
        //     this.movieSwiper = new Swiper(target, options);
        // }
    },
    updated() {
        const target = this.$refs.movieSwiper;
        const options = this.swiperOption;

        if (this.list && this.list.length) {
            this.movieSwiper = new Swiper(target, options);
        }
    },
    methods: {
        getImageUrl(url) {
            return this.imgPath + url;
        },
    },
};
</script>

<style>
.show {
    position: relative;
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
