<template>
    <MyModal class="detailView">
        <!-- 로딩 시 렌더링 화면 -->
        <template v-if="isLoading">
            <div class="detailView__header" slot="header">
                <div class="detailView__bg-wrapper">
                    <div class="detailView__bg skeleton"></div>
                </div>
            </div>
            <div class="detailView__content" slot="body">
                <div class="detailView__overview-wrapper skeleton">
                    <div class="detailView__overview">
                        <div class="detailView__overview__top">
                            <span class="skeleton-bar"></span>
                            <span class="skeleton-bar"></span>
                            <span class="skeleton-bar"></span>
                            <span class="skeleton-bar"></span>
                        </div>
                        <p class="synopsis skeleton"></p>
                    </div>
                </div>
                <div class="detailView__info-wrapper skeleton">
                    <ul class="detailView__info skeleton">
                        <li class="skeleton-list-item">
                            <div class="skeleton-circle"></div>
                            <div class="skeleton-bar"></div>
                        </li>
                        <li class="skeleton-list-item">
                            <div class="skeleton-circle"></div>
                            <div class="skeleton-bar"></div>
                        </li>
                        <li class="skeleton-list-item">
                            <div class="skeleton-circle"></div>
                            <div class="skeleton-bar"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detailView__footer" slot="footer"></div>
        </template>
        <!-- 데이터 렌더링 화면 -->
        <template v-else>
            <template v-if="movieDetail">
                <div class="detailView__header" slot="header">
                    <!-- 이미지 영역 -->
                    <div class="detailView__bg-wrapper">
                        <!-- <div class="loadingBg" v-if="loading"></div> -->
                        <figure class="detailView__bg">
                            <img
                                :src="poster"
                                @error="onErrorPoster"
                                ref="poster"
                            />
                        </figure>
                        <!-- 플레이어 영역 -->
                        <div class="detailView__player--wrapper">
                            <div class="detailView__player">
                                <!-- 영화 제목 -->
                                <div class="detailView__player__title">
                                    <p>{{ detail.title }}</p>
                                </div>
                                <div class="detailView__player__control">
                                    <button
                                        class="control__btn btn-l btn-default"
                                    >
                                        <font-awesome-icon icon="play" />
                                        <span>재생</span>
                                    </button>
                                    <!-- buttons -->
                                    <a
                                        href="#"
                                        class="control__btn controller__btn"
                                        v-if="isMyList"
                                        @click.prevent="SET_MY_LIST(detail)"
                                    >
                                        <font-awesome-icon icon="check" />
                                    </a>
                                    <a
                                        href="#"
                                        class="control__btn controller__btn"
                                        v-else
                                        @click.prevent="SET_MY_LIST(detail)"
                                    >
                                        <font-awesome-icon icon="plus" />
                                    </a>
                                    <a
                                        href="#"
                                        class="control__btn controller__btn"
                                        v-if="isFavorite"
                                        @click.prevent="
                                            SET_FAVORITE_LIST(detail.id)
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'thumbs-up']"
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        class="control__btn controller__btn"
                                        v-else
                                        @click.prevent="
                                            SET_FAVORITE_LIST(detail.id)
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="['far', 'thumbs-up']"
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        class="control__btn controller__btn"
                                        v-if="isHate"
                                        @click.prevent="
                                            SET_HATE_LIST(detail.id)
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'thumbs-down']"
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        class="control__btn controller__btn"
                                        v-else
                                        @click.prevent="
                                            SET_HATE_LIST(detail.id)
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="['far', 'thumbs-down']"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 모달 닫기 버튼 -->
                    <a
                        href="#"
                        class="detailView__closeBtn close-icon"
                        @click.prevent="onClose"
                    >
                        <font-awesome-icon icon="times" />
                    </a>
                </div>
                <!-- 영화 상세 -->
                <div class="detailView__content" slot="body">
                    <!-- overview -->
                    <div class="detailView__overview-wrapper">
                        <div class="detailView__overview">
                            <div class="detailView__overview__top">
                                <span
                                    class="detailView__overview__releaseDate"
                                    >{{ relaseDate }}</span
                                >
                                <span class="detailView__overview__title">{{
                                    detail.title
                                }}</span>
                                <span
                                    class="detailView__overview__runningTime"
                                    >{{ runtime }}</span
                                >
                                <span
                                    class="detailView__overview__adult"
                                    v-if="isAdult"
                                    >19 &plus;</span
                                >
                            </div>
                            <p class="detailView__overview__synopsis">
                                {{ detail.overview }}
                            </p>
                        </div>
                    </div>
                    <!-- info -->
                    <div class="detailView__info-wrapper">
                        <ul class="detailView__info">
                            <li>
                                <span
                                    class="detailView__info__tagLabel tag-label"
                                    >감독:</span
                                >
                                <a
                                    href="#"
                                    class="detailView__info__tag tag-item"
                                    v-for="director in directors"
                                    :key="director.id"
                                    :data-director-id="director.id"
                                    >{{ director.name }}</a
                                >
                            </li>
                            <li>
                                <span
                                    class="detailView__info__tag-label tag-label"
                                    >출연:</span
                                >
                                <a
                                    href="#"
                                    class="detailView__info__tag tag-item"
                                    v-for="actor in actors"
                                    :key="actor.id"
                                    :data-actor-id="actor.id"
                                    @click.prevent="onClickActor(actor)"
                                    >{{ actor.name }},</a
                                >
                                <a
                                    href="#"
                                    class="detailView__info__more tag-more"
                                    v-if="actors && actors.length"
                                    >더 보기</a
                                >
                            </li>
                            <li>
                                <span
                                    class="detailView__info__tagLabel tag-label"
                                    >장르:</span
                                >
                                <a
                                    href="#"
                                    class="detailView__info__tag tag-item"
                                    v-for="(genre, index) in genres"
                                    :key="genre.id"
                                    :data-genre-id="genre.id"
                                    >{{
                                        index === genres.length - 1
                                            ? `${genre.name}`
                                            : `${genre.name},`
                                    }}</a
                                >
                            </li>
                            <li class="detailView__info__voteAverage">
                                <span
                                    class="detailView__info__tagLabel tag-label"
                                    >평점:</span
                                >
                                <span class="detailView__info__tag tag-item">{{
                                    detail["vote_average"]
                                }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detailView__footer" slot="footer">
                    <button @click.prevent="$router.go(-1)">close</button>
                </div>
            </template>
        </template>
    </MyModal>
</template>

<script>
import MyModal from "../components/MyModal.vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import DEFAILT_BG from "@/assets/images/default_image.png";
import titleSample from "@/assets/images/detailview-player-title.png";
import { BACKDROP_PATH } from "../utils/constant.js";

export default {
    name: "DetailView",
    components: {
        MyModal,
    },
    data() {
        return {
            isLoading: false,
            defaultBg: DEFAILT_BG,
            titleSample: titleSample,
            actor_length: 4,
            backDropPath: BACKDROP_PATH,
            returnPath: "/browse",
            movieId: null,
            prevRoute: null,
        };
    },
    computed: {
        ...mapState({
            movieDetail: (state) => state.movieDetail,
        }),
        ...mapGetters(["isHateItem", "isFavoriteItem", "isInMyList"]),
        cast() {
            return this.movieDetail.cast;
        },
        crew() {
            return this.movieDetail.crew;
        },
        detail() {
            return this.movieDetail.detail;
        },
        relaseDate() {
            return this.detail["release_date"].substring(0, 4);
        },
        runtime() {
            const _time = this.detail.runtime;
            const _hour = Math.floor(_time / 60);
            const _min = _time % 60;
            return `${_hour}시 ${_min}분`;
        },
        isAdult() {
            return this.detail.adult;
        },
        directors() {
            return this.crew.filter((c) => c.job === "Director");
        },
        actors() {
            return this.cast.slice(0, this.actor_length);
        },
        genres() {
            return this.detail.genres;
        },
        poster() {
            return this.backDropPath + this.detail["backdrop_path"];
        },
        isHate() {
            return this.isHateItem(this.detail.id);
        },
        isFavorite() {
            return this.isFavoriteItem(this.detail.id);
        },
        isMyList() {
            return this.isInMyList(this.detail.id);
        },
    },
    created() {
        this.movieId = this.$route.query.jbv;

        const prevRoute = localStorage.getItem("prevRoute");
        this.prevRoute = prevRoute ? JSON.parse(prevRoute) : null;

        this.fetchData();
    },
    methods: {
        ...mapActions([
            "FETCH_MOVIE",
            "SET_FAVORITE_LIST",
            "SET_HATE_LIST",
            "SET_MY_LIST",
        ]),
        ...mapMutations(["SET_IS_MOVIE_DETAIL"]),
        async fetchData() {
            this.isLoading = true;
            try {
                await this.FETCH_MOVIE({
                    id: this.movieId,
                });
            } catch (err) {
                this.goPrev();
                this.SET_IS_MOVIE_DETAIL(false);
            } finally {
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            }
        },
        onErrorPoster() {
            const $poster = this.$refs.poster;
            $poster.setAttribute("src", this.defaultBg);
        },
        onClose() {
            this.goPrev();
            this.SET_IS_MOVIE_DETAIL(false);
        },
        goPrev() {
            const { path, query, params } = this.prevRoute;

            if (!path) {
                this.$router.push({
                    path: "/browseHome",
                });
            } else {
                this.$router.push({
                    path: path,
                    query: query,
                    params: params,
                });
            }
        },
        // 배우 페이지 이동
        onClickActor({ id, name }) {
            this.SET_IS_MOVIE_DETAIL(false);

            this.$router.push({
                name: "Person",
                params: {
                    pid: id,
                },
            });
        },
    },
};
</script>

<style>
.detailView {
    font-size: 1.5rem;
}

.detailView .myModal-container {
    min-width: 650px;
    max-width: 900px;
    margin: 0 auto;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.detailView .myModal__body {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}

.detailView__header {
    position: relative;
    width: 100%;
}

.detailView__bg-wrapper {
    position: relative;
    width: 100%;
}

.detailView__bg {
    overflow: hidden;
    width: 100%;
    min-height: 300px;
    /* background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#181818),
    color-stop(50%, transparent)
  ); */
}

.detailView__bg img {
    display: block;
    width: 100%;
    object-fit: fill;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.detailView__player--wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(#181818),
        color-stop(50%, transparent)
    );
    background: -webkit-linear-gradient(bottom, #181818, transparent 50%);
    background: -moz- oldlinear-gradient(bottom, #181818, transparent 50%);
    background: -o-linear-gradient(bottom, #181818, transparent 50%);
    background: linear-gradient(to top, #181818, transparent 50%);
}

.detailView__player {
    position: absolute;
    top: 50%;
    left: 1.5rem;
    width: 60%;
    transform: translateY(-10%);
}

.detailView__player__title {
    width: 100%;
    margin-bottom: 1.5rem;
    /* white-space: nowrap; */
}

.detailView__player__title p {
    font-family: "Nanum Pen Script", cursive;
    font-weight: bold;
    font-size: 6rem;
    color: white;
    letter-spacing: 1rem;
}

.detailView__player__title figure {
    overflow: hidden;
    width: 100%;
}

.detailView__player__title figure img {
    width: 100%;
    object-fit: fill;
}

.detailView__player__control {
    display: flex;
    align-items: center;
}

.detailView__closeBtn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

.detailView .control__btn:not(:last-child) {
    margin-right: 1rem;
}

pre {
    color: white;
}

/* 영화 상세 */

.detailView__content {
    display: flex;
    padding: 1.5rem 2rem;
    color: white;
    background-color: #181818;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}

.detailView__content a {
    color: inherit;
    text-decoration: none;
}

.detailView__overview-wrapper {
    flex: 1 1 85%;
    margin-right: 1rem;
}

.detailView__overview__top {
    display: flex;
    align-items: center;
    margin-bottom: 1.25em;
    font-size: 0.8rem;
}

.detailView__overview__top span {
    margin-right: 0.5rem;
}

.detailView__overview__releaseDate {
    font-weight: bold;
    font-size: 1.25rem;
    color: #44cc66;
    letter-spacing: 0.1rem;
}

.detailView__overview__title,
.detailView__overview__runningTime {
    font-size: 1.25rem;
}

.detailView__overview__adult {
    border: 1px solid #ef1023;
    color: #ef1023;
    padding: 0.1rem 0.2rem;
}

.detailView__overview__synopsis {
    line-height: 1.5;
    word-break: keep-all;
}

.detailView__info-wrapper {
    flex-shrink: 1;
}

.detailView__info li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
}

.detailView__info li:last-child {
    margin: 0;
}

.detailView .tag-label {
    color: gray;
    font-size: 0.8rem;
    margin-right: 0.25rem;
}

.detailView .tag-item:not(:last-child) {
    margin-right: 0.2rem;
}

.detailView .tag-item:hover,
.detailView .tag-more:hover {
    text-decoration: underline;
}

.detailView__info__voteAverage .tag-item {
    color: #e5d014;
}

.detailView .tag-more {
    font-style: oblique;
    font-weight: lighter;
}

.detailView__footer {
    display: none;
}

/* Loading component */
.detailView .loadingBg {
    width: 100%;
    height: 500px;
    background-color: rgba(0, 0, 0, 0.9);
}

.detailView .loading__overview__top {
    height: 2rem;
    width: 80%;
    margin-bottom: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}

.detailView .loading__overview__synopsis {
    width: 80%;
    height: 4rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}

.detailView__info .loading__block {
    width: 5rem;
    height: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}

/* skeletons */
.detailView__bg.skeleton {
    background: linear-gradient(to top, #181818, transparent 50%);
    background-color: #000;
}

.detailView__overview-wrapper.skeleton {
    flex: 1 1 70%;
}

.detailView__info-wrapper.skeleton {
    flex: 1 1 30%;
}

.detailView__overview__top .skeleton-bar {
    width: 25%;
}

.detailView__overview__top .skeleton-bar:last-child {
    margin: 0;
}

.detailView__info .skeleton-bar {
    width: 100%;
}

.synopsis.skeleton {
    width: 100%;
    height: 1.25rem;
    background-color: var(--skeleton-color);
}

@media screen and (max-width: 968px) {
    .detailView__player__title p {
        font-size: 4rem;
    }
}
</style>
