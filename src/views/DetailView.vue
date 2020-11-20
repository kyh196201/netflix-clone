<template>
  <MyModal class="detailView">
    <div class="detailView__header" slot="header">
      <!-- 이미지 영역 -->
      <div class="detailView__bg-wrapper">
        <figure class="detailView__bg">
          <img :src="bgSample" alt />
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
            <span class="detailView__overview__releaseDate">2014</span>
            <span class="detailView__overview__title">미생</span>
            <span class="detailView__overview__age">15 &plus;</span>
          </div>
          <p
            class="detailView__overview__synopsis"
          >프로 바둑기사 입단에 실패하고 여기저기 알바만 뛰던 장그래. 드디어 한 회사에 계약직으로 취업한다. 냉랭한 기업문화에서 따뜻한 사람들을 만나며 그는 차차 자신의 터를 구축해 나간다. 누구나 한때 사회 초년생이었기에 더욱 공감되고 안쓰러운 성장 이야기.</p>
        </div>
      </div>
      <!-- info -->
      <div class="detailView__info-wrapper">
        <ul class="detailView__info">
          <li>
            <span class="detailView__info__tag-label tag-label">출연:</span>
            <a href="#" class="detailView__info__tag tag-item">임시완,</a>
            <a href="#" class="detailView__info__tag tag-item">이성민,</a>
            <a href="#" class="detailView__info__tag tag-item">강소라,</a>
            <a href="#" class="detailView__info__more tag-more">더 보기</a>
          </li>
          <li>
            <span class="detailView__info__tagLabel tag-label">장르:</span>
            <a href="#" class="detailView__info__tag tag-item">웹툰 원작 한국 드라마,</a>
            <a href="#" class="detailView__info__tag tag-item">한국 드라마,</a>
            <a href="#" class="detailView__info__tag tag-item">TV 드라마,</a>
            <a href="#" class="detailView__info__more tag-more">더 보기</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="detailView__footer" slot="footer">
      <button @click.prevent="$router.go(-1)">close</button>
    </div>
  </MyModal>
</template>

<script>
import MyModal from "../components/MyModal.vue";
import { mapActions, mapState } from "vuex";
import bgSample from "@/assets/images/detailview-bg-sample.png";
import titleSample from "@/assets/images/detailview-player-title.png";

export default {
  name: "Detail",
  components: {
    MyModal
  },
  data() {
    return {
      movieId: "",
      bgSample: bgSample,
      titleSample: titleSample
    };
  },
  computed: {
    ...mapState({
      detail: state => state.movieDetail
    })
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
    }
  }
};
</script>

<style>
.detailView .myModal-container {
  min-width: 650px;
  max-width: 900px;
  margin: 0 auto;
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

.detailView__overview__age {
  border: 1px solid rgba(255, 255, 2550, 0.7);
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

.detailView .tag-more {
  font-style: oblique;
  font-weight: lighter;
}

.detailView__footer {
  display: none;
}
</style>
