<template>
  <div
    class="movieItem"
    @click="onClickMovieItem"
    @mouseenter="onMouseEnter($event)"
    @mouseleave="onMouseLeave($event)"
    :data-movie-id="this.movieId"
  >
    <figure>
      <img :src="poster" :alt="title" ref="poster" />
    </figure>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import getImageUrl from "@/utils/helpers/getImageUrl";
import getOffset from "@/utils/helpers/getOffset";
import imageMixin from "@/mixin/image/index";

export default {
  mixins: [imageMixin],
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 마우스 오버 이벤트 시작 시간, 종료 시간
      hoverEvent: {
        // 마우스 오버 이벤트가 시작한 시간
        startTime: null,

        // 마우스 오버 이벤트가 발생한 타겟
        target: null,

        // 경과 시간 체크용 타이머
        timer: null,

        // 딜레이
        delay: 1200,
      },

      // 엘리먼트 offset
      offset: null,

      // movieCard offset
      cardOffset: {},
    };
  },
  computed: {
    ...mapState("movie", {
      movieCardId: (state) => state.movieCardId,
      isMovieCard: (state) => state.isMovieCard,
    }),
    title() {
      return this.movie.title;
    },
    poster() {
      return getImageUrl(this.movie.poster_path, 2, "poster");
    },
    movieId() {
      return +this.movie.id;
    },
    // query의 movieId 값이 있고, 현재 movieId 값과 같은지 여부
    isSameQuery() {
      const currentQuery = this.$route.query;
      const isCurrentQuery = !!Object.keys(currentQuery).length;

      return isCurrentQuery && currentQuery.movieId == this.movieId;
    },

    // hover event elapsed time
    // hoverElapsed() {
    //   const { startTime, endTime } = this.hoverEvent;
    //   const elapsed = (endTime - startTime) / 1000;
    //   return Math.floor(elapsed);
    // },
  },

  methods: {
    // actions
    ...mapActions("movie", ["CLEAR_MOVIE_CARD"]),

    // set mutations
    ...mapMutations("movie", [
      "SET_IS_DETAIL_MODAL",
      "SET_MOVIE_CARD_ID",
      "SET_IS_MOVIE_CARD",
      "SET_MOVIE_CARD_OFFSET",
    ]),

    // 영화 상세 모달 띄우기
    onClickMovieItem(event) {
      event.stopPropagation();

      // movieId 쿼리가 같은 경우
      if (this.isSameQuery) {
        console.log("movieId값이 동일하여 페이지를 이동하지 않습니다.");
        return;
      }
      //  movieId 쿼리가 다른 경우
      else {
        // 현재 라우트 경로를 유지하면서, 쿼리스트링만 변경하기
        // https://stackoverflow.com/questions/40382388/how-to-set-url-query-params-in-vue-with-vue-router/40394184

        // movieCard가 있으면 movieCard 초기화
        if (this.isMovieCard) {
          this.CLEAR_MOVIE_CARD();
        }

        this.SET_IS_DETAIL_MODAL(true);
        return this.$router.replace({
          path: this.$route.path,
          query: {
            movieId: encodeURIComponent(this.movieId),
          },
        });
      }
    },

    // mouseover movie item event handler
    onMouseEnter(event) {
      event.stopPropagation();

      this.hoverEvent.startTime = new Date().getTime();
      this.hoverEvent.target = event.target;

      // 3초가 지났는지 체크하는 로직
      this.hoverEvent.timer = setInterval(() => {
        // 경과한 시간 체크
        const elapsed = new Date().getTime() - this.hoverEvent.startTime;

        if (elapsed >= this.hoverEvent.delay) {
          this.clearHoverEvent();

          // moviecard offset 설정
          this.getImageOffset();
          this.SET_MOVIE_CARD_OFFSET(this.cardOffset);
          this.SET_IS_MOVIE_CARD(true);
          this.SET_MOVIE_CARD_ID(this.movieId);
        }
      }, 500);
    },

    // mouseover movie item event handler
    onMouseLeave(event) {
      event.stopPropagation();

      // 마우스 오버 도중 마우스 아웃 이벤트가 발생했을 경우
      if (this.hoverEvent.timer && this.hoverEvent.target) {
        this.clearHoverEvent();
      } else {
        // this.SET_IS_MOVIE_CARD(false);
      }
    },

    // clear hoverEvent object
    clearHoverEvent() {
      clearInterval(this.hoverEvent.timer);

      this.hoverEvent.timer = null;
      this.hoverEvent.target = null;
      this.hoverEvent.startTime = null;
    },

    // get image offset
    getImageOffset() {
      console.log("getImageOffset");

      // 카드 최소 너비, 높이
      const cardMinWidth = 200;
      const cardMinHeight = 250;

      const slideIndex = this.$el.dataset.slideIndex;

      // 이미지 태그를 기준으로 offset 계산
      this.offset = getOffset(this.$refs.poster);

      const _width = this.offset.width * 2;
      const _height = this.offset.height * 1.5;

      // get center of poster
      const centerOffsetLeft = this.offset.left + this.offset.width / 2;
      const centerOffsetTop = this.offset.top + this.offset.height / 2;

      let _left = 0;
      let _top = 0;

      // 제일 왼쪽에 있을 경우 (0, 7 ...번 인덱스)
      if (slideIndex % 7 === 0) {
        _left = this.offset.left;
      }
      // 제일 오른쪽에 있을 경우 (6, 13, ...번 인덱스)
      else if (slideIndex % 7 === 6) {
        _left = this.offset.left + this.offset.width - _width;
      } else {
        _left = centerOffsetLeft - _width / 2;
      }
      _top = centerOffsetTop - _height / 2;

      // set cardoffset
      if (_width < cardMinWidth) {
        this.$set(this.cardOffset, "width", cardMinWidth + "px");
      } else {
        this.$set(this.cardOffset, "width", _width + "px");
      }

      if (_height < cardMinHeight) {
        this.$set(this.cardOffset, "height", cardMinHeight + "px");
      } else {
        this.$set(this.cardOffset, "height", _height + "px");
      }

      this.$set(this.cardOffset, "left", _left + "px");
      this.$set(this.cardOffset, "top", _top + "px");
    },
  },
};
</script>

<style scoped>
.movieItem {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.movieItem figure {
  display: block;
  position: relative;
  width: 100%;
  padding-bottom: 150%;
}

.movieItem img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>
