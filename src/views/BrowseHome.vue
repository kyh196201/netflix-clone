<template>
    <section class="browseHome">
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
        <Show :title="listTitle.topRated" :list="topRated" />
        <Show :title="listTitle.upComing" :list="upComing" />
        <Show :title="listTitle.playing" :list="playing" />
    </section>
</template>

<script>
import Show from "@/components/Show.vue";
import * as api from "../api";
import { TITLE } from "../utils/constant.js";

export default {
    name: "BrowseHome",
    components: {
        Show,
    },
    data() {
        return {
            topRated: [],
            upComing: [],
            playing: [],
            listTitle: TITLE,
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 멀티 요청
        async fetchData() {
            try {
                const [topRated, upComing, playing] = await api.requestAll([
                    this.fetchTopRating(),
                    this.fetchUpComing(),
                    this.fetchPlaying(),
                ]);
                this.topRated = topRated && topRated.results;
                this.upComing = upComing && upComing.results;
                this.playing = playing && playing.results;
            } catch (err) {
                console.error(err);
            } finally {
                console.log("finally");
            }
        },
        // 높은 평점 데이터
        async fetchTopRating() {
            try {
                const res = await api.movies.topRated();
                return res;
            } catch (err) {
                console.error(err);
            } finally {
                console.log("finally");
            }
        },
        // 개봉 예정 데이터
        async fetchUpComing() {
            try {
                const res = await api.movies.upComing();
                return res;
            } catch (err) {
                console.error(err);
            } finally {
                console.log("finally");
            }
        },
        // 상영중 데이터
        async fetchPlaying() {
            try {
                const res = await api.movies.playing();
                return res;
            } catch (err) {
                console.error(err);
            } finally {
                console.log("finally");
            }
        },
    },
};
</script>

<style>
.bilboard-container {
    position: relative;
    padding-bottom: 40%;
    /* z-index: -1; */
}

.bilboard-wrapper {
    position: absolute;
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
    height: auto;
    max-height: 90vh;
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

.meta__btn > svg {
    margin-right: 0.5rem;
}
</style>
