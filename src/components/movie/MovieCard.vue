<template>
  <HoverCard :style="offset" :class="cardClass">
    <template v-if="!isEmpty">
      <div class="movie-card" @mouseleave="onMouseLeave">
        <figure class="movie-card__image">
          <img :src="backdrop" :alt="movieTitle" @error="onErrorImage" />
        </figure>
        <div class="movie-card__content">
          <!-- 영화 컨트롤러 -->
          <div class="movie-controls">
            <button type="button" id="play" class="btn btn-play">
              <font-awesome-icon icon="play" />
            </button>
            <button
              type="button"
              class="btn btn-user"
              v-if="isInMyList(movieId)"
              @click.prevent="removeMyList(movieData)"
            >
              <font-awesome-icon icon="check" />
            </button>
            <button
              type="button"
              class="btn btn-user"
              v-else
              @click.prevent="addMyList(movieData)"
            >
              <font-awesome-icon icon="plus" />
            </button>
            <button
              type="button"
              class="btn btn-user"
              v-if="isInLikeList(movieId)"
              @click="removeLikeList(movieData)"
            >
              <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            </button>
            <button
              type="button"
              class="btn btn-user"
              v-else
              @click="addLikeList(movieData)"
            >
              <font-awesome-icon :icon="['far', 'thumbs-up']" />
            </button>
            <button
              type="button"
              class="btn btn-user"
              v-if="isInHateList(movieId)"
              @click="removeHateList(movieData)"
            >
              <font-awesome-icon :icon="['fas', 'thumbs-down']" />
            </button>
            <button
              type="button"
              class="btn btn-user"
              v-else
              @click="addHateList(movieData)"
            >
              <font-awesome-icon :icon="['far', 'thumbs-down']" />
            </button>
            <button
              type="button"
              class="btn btn-user btn-user--caret"
              @click.prevent="showDetailView"
            >
              <font-awesome-icon :icon="['fas', 'caret-down']" />
            </button>
          </div>
          <div class="movie-card__info">
            <div class="movie-card__detail">
              <span class="movie-card__releaseDate">{{ releaseDate }}</span>
              <span class="movie-card__runtime">{{ runtime }}</span>
            </div>
            <ul class="movie-card__genre-list" v-if="genres">
              <li
                class="movie-card__genre"
                v-for="(genre, index) in genres"
                :key="`genre-${index}`"
              >
                {{ genre.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </HoverCard>
</template>

<script>
import { mapState, mapActions } from "vuex";

// components
import HoverCard from "@/components/common/HoverCard.vue";

// mixins
import imageMixin from "@/mixin/image/index";
import movieControlMixin from "@/mixin/movieControl/index";

// functions
import { getRuntime, getReleaseDate } from "@/utils/helpers/movie.js";
import getImageUrl from "@/utils/helpers/getImageUrl.js";

export default {
  mixins: [imageMixin, movieControlMixin],
  components: {
    HoverCard,
  },
  computed: {
    ...mapState("movie", {
      movieId: (state) => state.movieCardId,
      movieData: (state) => state.selectedMovie,
    }),

    // check movieData is empty
    isEmpty() {
      return !Object.keys(this.movieData).length;
    },

    // movie card offset
    offset() {
      return this.$store.state.movie.movieCardOffset;
    },

    // check is movie card
    isMovieCard() {
      return this.$store.state.movie.isMovieCard;
    },

    // hover card class
    cardClass() {
      return {
        "movie-card-wrapper": true,
        active: this.isMovieCard,
        "animation--bigger": this.isMovieCard,
      };
    },

    // template bindings
    releaseDate() {
      const date = this.movieData.release_date;
      return getReleaseDate(date);
    },

    runtime() {
      return getRuntime(this.movieData.runtime);
    },

    backdrop() {
      return getImageUrl(this.movieData.backdrop_path, 2, "backdrop");
    },

    movieTitle() {
      return this.movieData.title;
    },

    genres() {
      return this.movieData.genres;
    },
  },

  watch: {
    movieId: {
      handler: function(newValue, oldValue) {
        this.fetchData();
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions("movie", ["CLEAR_MOVIE_CARD", "FETCH_SELECTED_MOVIE"]),

    onMouseLeave(event) {
      // close movie card
      this.CLEAR_MOVIE_CARD();
    },

    // fetch movie data
    fetchData() {
      try {
        this.FETCH_SELECTED_MOVIE(this.movieId);
      } catch (error) {
        console.error(error);
      }
    },

    // show detail modal
    showDetailView() {
      if (this.movieId && typeof this.movieId === "number") {
        this.$router
          .replace({
            query: {
              movieId: this.movieId,
            },
          })
          .then(() => {
            this.CLEAR_MOVIE_CARD();
          });
      }
    },
  },
};
</script>

<style>
.movie-card-wrapper.active {
  position: absolute;
  z-index: 99;
}

.movie-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  color: var(--white-color);
  background-color: var(--background-color);
}

/* .movie-card.active {
  position: fixed;
  z-index: 99;
} */

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
  font-size: 0.85vw;
  margin-bottom: 1em;
}

.movie-card .movie-controls button {
  font-size: 1em;
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
