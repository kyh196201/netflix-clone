<template>
    <div class="mainMovie-container">
        <div class="mainMovie-wrapper">
            <!-- 영화 포스터 -->
            <div class="mainMovie__image-wrapper">
                <figure class="mainMovie__image">
                    <img :src="poster" :alt="title" />
                </figure>
            </div>
        </div>
        <div class="mainMovie-meta-wrapper">
            <!-- 영화 정보 영역 -->
            <div class="mainMovie__meta">
                <div :class="mainTitleClass">{{ title }}</div>
                <p class="mainMovie__meta__synopsis">{{ overview }}</p>
                <div class="mainMovie__meta__control">
                    <button
                        type="button"
                        class="meta__btn btn-l btn-default meta__playBtn"
                    >
                        <font-awesome-icon icon="play" />
                        <span>재생</span>
                    </button>
                    <button
                        type="button"
                        class="meta__btn btn-l btn-gray meta__detailBtn"
                    >
                        <font-awesome-icon icon="info-circle" />
                        <span>상세 정보</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { movies } from "@/api/index";
import { getBackdrop } from "@/utils/constant.js";
import { mapState, mapActions } from "vuex";

export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapState("movie", {
            mainMovie: (state) => state.mainMovie,
        }),
        poster() {
            return this.mainMovie
                ? getBackdrop(this.mainMovie.backdrop_path)
                : "";
        },
        title() {
            return this.mainMovie ? this.mainMovie.title : "";
        },
        mainTitleClass() {
            return {
                mainMovie__meta__title: true,
                long: this.title && this.title.length >= 10,
            };
        },
        overview() {
            return this.mainMovie ? this.mainMovie.overview : "";
        },
    },
    created() {
        this.fetchMovie();
    },
    methods: {
        //movie 모듈에 있는 actions 가져오기
        ...mapActions("movie", ["FETCH_MAIN_MOVIE"]),
        fetchMovie() {
            this.FETCH_MAIN_MOVIE(this.id);
        },
    },
};
</script>

<style scoped>
.mainMovie-container {
    position: relative;
    padding-bottom: 40%;
}

.mainMovie-wrapper,
.mainMovie-meta-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
}

.mainMovie-meta-wrapper {
    background-color: transparent;
    background: linear-gradient(to top, #181818, transparent 50%);
}

.mainMovie__image-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.mainMovie__image {
    width: 100%;
    height: 100%;
}

.mainMovie__image > img {
    width: 100%;
    height: 100%;
}

.mainMovie__meta {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 0 3rem;
    transform: translate(0, -40%);
    z-index: 10;
    width: 100%;
}

.mainMovie__meta__title {
    overflow: hidden;
    margin-bottom: 2.4rem;
    width: 100%;
    color: #fff;
    font-size: 10rem;
    font-weight: bold;
    letter-spacing: 20px;
    white-space: nowrap;
}

.mainMovie__meta__title.long {
    font-size: 5rem;
}

.mainMovie__meta__synopsis {
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

.mainMovie__meta__control > button:first-child {
    margin-right: 1.6rem;
}

.mainMovie__meta__control button {
    padding: 1rem 2rem;
    font-size: 1.5rem;
}
</style>
