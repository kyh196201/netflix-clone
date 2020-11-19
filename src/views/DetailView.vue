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
          <button class="control__btn btn-xl btn-default">
            <font-awesome-icon icon="play" />
            <span>재생</span>
          </button>
          <!-- buttons -->
          <a href="#" class="control__btn user-icon">
            <font-awesome-icon icon="plus" />
          </a>
          <a href="#" class="control__btn user-icon">
            <font-awesome-icon :icon="['far', 'thumbs-up']" />
          </a>
          <a href="#" class="control__btn user-icon">
            <font-awesome-icon :icon="['far', 'thumbs-down']" />
          </a>
        </div>
      </div>
      <!-- 모달 닫기 버튼 -->
      <a href="#" class="detailView__closeBtn close-icon">
        <font-awesome-icon icon="times" />
      </a>
    </div>
    <div class="detailView__content" slot="body">
      <pre>
        {{ detail }}
    </pre>
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
  max-width: 900px;
  margin: 0 auto;
}

.detailView__content {
  background-color: #181818;
}

.detailView__header {
  position: relative;
}

.detailView__bg {
  overflow: hidden;
  width: 100%;
}

.detailView__bg img {
  display: block;
  width: 100%;
  object-fit: fill;
  border-top-right-radius: 1%;
  border-top-left-radius: 1%;
}

.detailView__player {
  position: absolute;
  top: 50%;
  left: 1.5rem;
  width: 45%;
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
</style>
