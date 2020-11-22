<template>
  <MyModal class="detailView">
    <template v-if="movieDetail">
      <div class="detailView__header" slot="header">
        <!-- 이미지 영역 -->
        <div class="detailView__bg-wrapper">
          <figure class="detailView__bg">
            <img :src="poster" @error="onErrorPoster" ref="poster" />
          </figure>
        </div>
        <!-- 플레이어 영역 -->
        <div class="detailView__player">
          <div class="detailView__player__title">
            <figure>
              <img :src="titleSample" alt="player title" />
            </figure>
          </div>
          <div class="detailView__player__control">
            <button class="control__btn btn-l btn-default">
              <font-awesome-icon icon="play" />
              <span>재생</span>
            </button>
            <!-- buttons -->
            <a href="#" class="control__btn user-icon">
              <font-awesome-icon icon="plus" />
              <font-awesome-icon icon="check" />
            </a>
            <a href="#" class="control__btn user-icon">
              <font-awesome-icon :icon="['far', 'thumbs-up']" />
              <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            </a>
            <a href="#" class="control__btn user-icon">
              <font-awesome-icon :icon="['far', 'thumbs-down']" />
              <font-awesome-icon :icon="['fas', 'thumbs-down']" />
            </a>
          </div>
        </div>
        <!-- 모달 닫기 버튼 -->
        <a href="#" class="detailView__closeBtn close-icon">
          <font-awesome-icon icon="times" />
        </a>
        <div class="detailView__header__blurLayer blur-layer"></div>
      </div>
      <!-- 영화 상세 -->
      <div class="detailView__content" slot="body">
        <!-- overview -->
        <div class="detailView__overview-wrapper">
          <div class="detailView__overview">
            <div class="detailView__overview__top">
              <span class="detailView__overview__releaseDate">{{relaseDate}}</span>
              <span class="detailView__overview__title">{{detail.title}}</span>
              <span class="detailView__overview__runningTime">{{runtime}}</span>
              <span class="detailView__overview__adult" v-if="isAdult">19 &plus;</span>
            </div>
            <p class="detailView__overview__synopsis">{{detail.overview}}</p>
          </div>
        </div>
        <!-- info -->
        <div class="detailView__info-wrapper">
          <ul class="detailView__info">
            <li>
              <span class="detailView__info__tagLabel tag-label">감독:</span>
              <template v-if="directors && directors.length">
                <a
                  href="#"
                  class="detailView__info__tag tag-item"
                  v-for="director in directors"
                  :key="director.id"
                  :data-director-id="director.id"
                >{{ director.name }}</a>
              </template>
            </li>
            <li>
              <span class="detailView__info__tag-label tag-label">출연:</span>
              <template v-if="actors && actors.length">
                <a
                  href="#"
                  class="detailView__info__tag tag-item"
                  v-for="actor in actors"
                  :key="actor.id"
                  :data-actor-id="actor.id"
                >{{ actor.name }},</a>
              </template>
              <a
                href="#"
                class="detailView__info__more tag-more"
                v-if="actors && actors.length"
              >더 보기</a>
            </li>
            <li>
              <span class="detailView__info__tagLabel tag-label">장르:</span>
              <template v-if="genres && genres.length">
                <a
                  href="#"
                  class="detailView__info__tag tag-item"
                  v-for="(genre, index) in genres"
                  :key="genre.id"
                  :data-genre-id="genre.id"
                >{{ index === genres.length - 1 ? `${genre.name}` : `${genre.name},` }}</a>
              </template>
            </li>
            <li class="detailView__info__voteAverage">
              <span class="detailView__info__tagLabel tag-label">평점:</span>
              <span class="detailView__info__tag tag-item">{{ detail["vote_average"] }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="detailView__footer" slot="footer">
        <button @click.prevent="$router.go(-1)">close</button>
      </div>
    </template>
  </MyModal>
</template>

<script>
import MyModal from "../components/MyModal.vue";
import { mapActions, mapState } from "vuex";
import SAMPLE_BG from "@/assets/images/detailview-bg-sample.png";
import DEFAILT_BG from "@/assets/images/default_image.png";
import titleSample from "@/assets/images/detailview-player-title.png";
import { BACKDROP_PATH } from "../utils/constant.js";

export default {
  name: "Detail",
  components: {
    MyModal
  },
  data() {
    return {
      movieId: "",
      bgSample: SAMPLE_BG,
      defaultBg: DEFAILT_BG,
      titleSample: titleSample,
      actor_length: 4,
      backDropPath: BACKDROP_PATH
    };
  },
  computed: {
    ...mapState({
      movieDetail: state => state.movieDetail
    }),
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
      return this.crew.filter(c => c.job === "Director");
    },
    actors() {
      return this.cast.slice(0, this.actor_length);
    },
    genres() {
      return this.detail.genres;
    },
    poster() {
      return this.backDropPath + this.detail["backdrop_path"];
    }
  },
  created() {
    this.movieId = this.$route.params.mid;
    this.fetchData();
  },
  methods: {
    ...mapActions(["FETCH_MOVIE"]),
    async fetchData() {
      await this.FETCH_MOVIE({
        id: this.movieId
      });
    },
    onErrorPoster() {
      const $poster = this.$refs.poster;

      $poster.setAttribute("src", this.defaultBg);
    }
  }
};
</script>

<style>
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
}

.detailView__bg {
  overflow: hidden;
  width: 100%;
  min-height: 300px;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#181818),
    color-stop(50%, transparent)
  );
}

.detailView__bg img {
  display: block;
  width: 100%;
  max-height: 500px;
  object-fit: fill;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.detailView__player {
  position: absolute;
  top: 50%;
  left: 1.5rem;
  width: 55%;
  transform: translateY(-30%);
}

.detailView__player__title {
  width: 100%;
  margin-bottom: 1.5rem;
  white-space: nowrap;
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
  color: #44cc66;
  letter-spacing: 0.1rem;
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
  font-size: 0.85rem;
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
</style>
