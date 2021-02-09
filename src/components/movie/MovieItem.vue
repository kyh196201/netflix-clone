<template>
  <div
    class="movieItem"
    @click="onClickMovieItem"
    @mouseover="onMouseOver($event)"
    @mouseout="onMouseOut($event)"
    :data-movie-id="this.movieId"
  >
    <figure>
      <img :src="poster" :alt="title" ref="poster" />
    </figure>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
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
        delay: 1500,
      },

      // 엘리먼트 offset
      offset: null,

      // movieCard offset
      cardOffset: {},
    };
  },
  computed: {
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
    // set actions
    ...mapActions("movie", ["FETCH_MOVIE_CARD"]),

    // set mutations
    ...mapMutations("movie", [
      "SET_IS_DETAIL_MODAL",
      "SET_MOVIE_CARD_ID",
      "SET_IS_MOVIE_CARD",
      "SET_MOVIE_CARD_OFFSET",
    ]),

    // click movie item event handler
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
    onMouseOver(event) {
      event.stopPropagation();

      /*
        1. 마우스를 무비 아이템에 올린다.
        2. 마우스를 올린 후 일정 시간이 지나면, 포지션을 계산한다.
        3. 스토어에 무비 카드 오프셋을 갱신한다.
        4. api를 요청한다.
        5. api요청이 완료 되면 스토어를 세팅한다.
        6. 무비 카드를 보여준다.
      */

      /*
        1. 마우스를 올린 순간 이벤트 타겟과 시작 시간을 설정한다.
        2. setInterval을 통해서 시간이 3초 지났는지 체크하고, 3초보다 커졌을 경우 원하는 로직을 실행한다.
      */

      this.hoverEvent.startTime = new Date().getTime();
      this.hoverEvent.target = event.target;

      // 3초가 지났는지 체크하는 로직
      this.hoverEvent.timer = setInterval(() => {
        // 경과한 시간 체크
        const elapsed = new Date().getTime() - this.hoverEvent.startTime;

        if (elapsed >= this.hoverEvent.delay) {
          this.clearHoverEvent();

          // 여기서 부터 로직 시작
          console.log("set movie card position");

          // moviecard offset 설정
          this.getImageOffset();
          this.SET_MOVIE_CARD_OFFSET(this.cardOffset);
          this.SET_IS_MOVIE_CARD(true);
        }
      }, 500);

      console.log("mouse over to movie item");
    },

    // mouseover movie item event handler
    onMouseOut(event) {
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
      // 이미지 태그를 기준으로 offset 계산
      this.offset = getOffset(this.$refs.poster);

      // set cardoffset
      this.$set(this.cardOffset, "width", this.offset.width * 1.1 + "px");
      this.$set(this.cardOffset, "height", this.offset.height + "px");
      this.$set(
        this.cardOffset,
        "left",
        this.offset.left + this.offset.width / 2 + "px"
      );
      this.$set(
        this.cardOffset,
        "top",
        this.offset.top + this.offset.height / 2 + "px"
      );
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
