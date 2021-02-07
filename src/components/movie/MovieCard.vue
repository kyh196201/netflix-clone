<template>
  <HoverCard>
    <div class="movie-card" :style="offset">
      <figure class="movie-card__image">
        <img :src="defaultImage" alt="이미지 제목" />
      </figure>
      <div class="movie-card__content">
        <!-- 영화 컨트롤러 -->
        <div class="movie-controls">
          <button type="button" id="play" class="btn btn-play">
            <font-awesome-icon icon="play" />
          </button>
          <button type="button" class="btn btn-user" v-if="false">
            <font-awesome-icon icon="check" />
          </button>
          <button type="button" class="btn btn-user">
            <font-awesome-icon icon="plus" />
          </button>
          <button type="button" class="btn btn-user" v-if="false">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          </button>
          <button type="button" class="btn btn-user">
            <font-awesome-icon :icon="['far', 'thumbs-up']" />
          </button>
          <button type="button" class="btn btn-user" v-if="false">
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          </button>
          <button type="button" class="btn btn-user">
            <font-awesome-icon :icon="['far', 'thumbs-down']" />
          </button>
          <button type="button" class="btn btn-user btn-user--caret">
            <font-awesome-icon :icon="['fas', 'caret-down']" />
          </button>
        </div>
        <div class="movie-card__info">
          <div class="movie-card__detail">
            <span class="movie-card__releaseDate">2009</span>
            <span class="movie-card__runtime">2시간 15분</span>
          </div>
          <ul class="movie-card__genre-list">
            <li class="movie-card__genre">
              소름
            </li>
            <li class="movie-card__genre">
              폭력
            </li>
            <li class="movie-card__genre">
              무서운 이야기
            </li>
            <li class="movie-card__genre">
              무서운 이야기
            </li>
            <li class="movie-card__genre">
              무서운 이야기
            </li>
          </ul>
        </div>
      </div>
    </div>
  </HoverCard>
</template>

<script>
import HoverCard from "@/components/common/HoverCard.vue";
import imageMixin from "@/mixin/image/index";
export default {
  mixins: [imageMixin],
  components: {
    HoverCard,
  },
  data() {
    return {
      offset: {
        width: 300 + "px",
        "font-size": 10 + "px",
      },
    };
  },
};
</script>

<style>
.movie-card {
  width: 100%;
  font-size: 1rem;
  color: var(--white-color);
  background-color: var(--background-color);
}

.movie-card__image {
  display: block;
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}

.movie-card__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.movie-card__content {
  padding: 1em;
}

.movie-card .movie-controls {
  margin-bottom: 1em;
}

.movie-card .movie-controls button {
  font-size: 1.25em;
  padding: 1em;
  margin: 0.25em;
}

.movie-card .btn-user svg {
  width: 1em;
  height: 1em;
}

.movie-card .btn-play {
  border-radius: 50%;
}

.movie-card__detail {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 1em;
}

.movie-card__genre-list,
.movie-card__detail {
  font-size: 1.5em;
}

.movie-card__releaseDate {
  margin-right: 1rem;
  color: var(--release-date-color);
}

/* .movie-card__vote {
  color: var(--vote-color);
} */

.movie-card__genre-list {
  display: flex;
  flex-wrap: wrap;
}

.movie-card__genre {
  margin: 0 1em 0.5em 0;
  word-break: keep-all;
}

.movie-card .btn-user--caret {
  margin-left: auto !important;
}
</style>
