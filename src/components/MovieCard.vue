<template>
  <div class="movieCard fadeIn">
    <figure class="movieCard__thumnail">
      <img :src="poster" :alt="data.title" />
    </figure>
    <div class="movieCard__controller">
      <div class="movieCard__info">
        <p class="movieCard__title">{{ data.title }}</p>
        <p class="movieCard__releaseDate">{{ releaseDate }}</p>
      </div>
      <ul class="movieCard__controller__btnWrapper">
        <li>
          <button class="controller__btn play">
            <font-awesome-icon icon="play" />
          </button>
        </li>
        <li v-if="isMyList">
          <button class="controller__btn" @click.prevent="SET_MY_LIST(data)">
            <font-awesome-icon icon="check" />
          </button>
        </li>
        <li v-else>
          <button class="control__btn controller__btn" @click.prevent="SET_MY_LIST(data)">
            <font-awesome-icon icon="plus" />
          </button>
        </li>
        <li v-if="isFavorite">
          <button class="controller__btn" @click="SET_FAVORITE_LIST(data.id)">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          </button>
        </li>
        <li v-else>
          <button class="controller__btn" @click="SET_FAVORITE_LIST(data.id)">
            <font-awesome-icon :icon="['far', 'thumbs-up']" />
          </button>
        </li>
        <li v-if="isHate">
          <button class="controller__btn" @click="SET_HATE_LIST(data.id)">
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          </button>
        </li>
        <li v-else>
          <button class="controller__btn" @click="SET_HATE_LIST(data.id)">
            <font-awesome-icon :icon="['far', 'thumbs-down']" />
          </button>
        </li>
        <li class="movieCard__caretBtn">
          <button class="controller__btn" @click.prevent="goDetail(data.id)">
            <font-awesome-icon icon="caret-down" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPoster } from "../utils/constant.js";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "MovieCard",
  props: ["data"],
  computed: {
    ...mapGetters(["isHateItem", "isFavoriteItem", "isInMyList"]),
    isFavorite() {
      return this.isFavoriteItem(this.data.id);
    },
    isHate() {
      return this.isHateItem(this.data.id);
    },
    releaseDate() {
      const { release_date } = this.data;
      return release_date ? release_date.substring(0, 4) : "";
    },
    poster() {
      const { poster_path } = this.data;

      return poster_path ? getPoster(poster_path) : null;
    },
    isVideo() {
      return this.data.video;
    },
    isMyList() {
      return this.isInMyList(this.data.id);
    }
  },
  methods: {
    ...mapActions(["SET_MY_LIST", "SET_HATE_LIST", "SET_FAVORITE_LIST"]),
    ...mapMutations(["SET_IS_MOVIE_DETAIL"]),
    goDetail(id) {
      this.SET_IS_MOVIE_DETAIL(true);

      const { path, query, params } = this.$route;
      const newQuery = {
        ...query,
        jbv: id
      };

      this.$router.push({
        path: path,
        query: newQuery,
        params: params
      });
    }
  }
};
</script>

<style>
.movieCard {
  width: 100%;
  max-width: 250px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.movieCard:hover {
  transform: scale(1.1);
}

.movieCard__thumnail {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 56.25%;
}

.movieCard__thumnail > img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.movieCard__controller {
  padding: 0.5rem 1rem 1rem;
  background-color: #1f1e1e;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.movieCard .controller__btn {
  /* padding: 0.55em 0.65em; */
  width: 2rem;
  height: 2rem;
  font-size: 0.75em;
}

.movieCard__info {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;
}

.movieCard__title {
  overflow: hidden;
  width: 100%;
  font-family: "Nanum Pen Script", cursive;
  font-size: 1.75em;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movieCard__releaseDate {
  font-size: 1em;
  font-weight: bold;
  color: #44cc66;
  letter-spacing: 0.1rem;
}

.movieCard__controller__btnWrapper:after {
  display: block;
  clear: both;
  content: "";
}

.movieCard__controller__btnWrapper li {
  display: block;
  float: left;
}

.movieCard__controller__btnWrapper li:not(:last-child) {
  margin-right: 5px;
}

.movieCard__controller__btnWrapper li.movieCard__caretBtn {
  float: right;
}

/* .movieCard__controller__btnWrapper li:last-child {
  margin-left: auto;
} */
</style>