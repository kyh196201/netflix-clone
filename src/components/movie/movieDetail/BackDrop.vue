<template>
  <div class="movieDetail__backdrop">
    <div class="movieDetail__backdropImg">
      <figure>
        <img :src="poster" :alt="movieTitle" @error="onErrorImage($event)" />
      </figure>
    </div>
    <div class="movieDetail__backdropInfo">
      <div class="movieDetail__backdropInfo__content">
        <p class="movieDetail__backdropTitle">{{ movieTitle }}</p>
        <div class="movieDetail__backdrop__controls movie-controls">
          <button type="button" id="play" class="btn btn-play">
            <font-awesome-icon icon="play" />
            <span class="btn__title">재생</span>
          </button>
          <button
            type="button"
            class="btn btn-user"
            v-if="isInMyList(movieId)"
            @click="removeMyList(movie)"
          >
            <font-awesome-icon icon="check" />
          </button>
          <button
            type="button"
            class="btn btn-user"
            v-else
            @click="addMyList(movie)"
          >
            <font-awesome-icon icon="plus" />
          </button>
          <button
            type="button"
            class="btn btn-user"
            v-if="isInLikeList(movieId)"
            @click="removeLikeList(movie)"
          >
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          </button>
          <button
            type="button"
            class="btn btn-user"
            v-else
            @click="addLikeList(movie)"
          >
            <font-awesome-icon :icon="['far', 'thumbs-up']" />
          </button>
          <button
            type="button"
            class="btn btn-user"
            v-if="isInHateList(movieId)"
            @click="removeHateList(movie)"
          >
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          </button>
          <button
            type="button"
            class="btn btn-user"
            v-else
            @click="addHateList(movie)"
          >
            <font-awesome-icon :icon="['far', 'thumbs-down']" />
          </button>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-close" @click="closeModal">
      <font-awesome-icon icon="times" />
    </button>
  </div>
</template>

<script>
// mixins
import imageMixin from "@/mixin/image/index";
import movieControlMixin from "@/mixin/movieControl/index";

// functions
import getImageUrl from "@/utils/helpers/getImageUrl.js";

export default {
  mixins: [imageMixin, movieControlMixin],
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // get movie backdrop image
    poster() {
      // return "https://image.tmdb.org/t/p/w1280" + this.movie.backdrop_path;
      return getImageUrl(this.movie.backdrop_path, 2, "backdrop");
    },

    // get movie title
    movieTitle() {
      return this.movie.title;
    },

    // get movie id
    movieId() {
      return this.movie.id;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.movieDetail__backdrop {
  position: relative;
}

.movieDetail__backdropImg {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: 56.2%;
}

.movieDetail__backdropImg figure {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.movieDetail__backdropImg img {
  display: block;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* height: 100%; */
}

.movieDetail__backdropInfo {
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
}

.movieDetail__backdropInfo__content {
  position: absolute;
  bottom: 5%;
  left: 3rem;
}

.movieDetail__backdropTitle {
  margin-bottom: 3rem;
  font-size: 6rem;
  line-height: 1.2;
}

.movieDetail__backdrop__controls .btn {
  margin: 0.25rem;
  font-size: 1.5rem;
}

.movieDetail__backdrop__controls .btn-play {
  padding: 1.25rem 3rem;
}

.movieDetail__backdrop__controls .btn-play .btn__title {
  margin-left: 1rem;
}

.movieDetail__backdrop__controls .btn-user {
  padding: 1.5rem;
  border-width: 2px;
}

.movieDetail__backdrop__controls .btn-user:hover {
  border-color: var(--white-color);
}

.movieDetail__backdrop .btn-close {
  display: flex;
  position: absolute;
  top: 2rem;
  right: 2rem;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: var(--white-color);
  background-color: #292929;
  font-size: 2rem;
}
</style>
