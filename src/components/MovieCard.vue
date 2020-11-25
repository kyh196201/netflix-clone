<template>
  <div class="movieCard">
    <figure class="movieCard__thumnail">
      <img :src="poster" alt="thumnail" />
    </figure>
    <div class="movieCard__controller">
      <p class="movieCard__title">어벤져스</p>
      <ul class="movieCard__controller__btnWrapper">
        <li>
          <button class="controller__btn">
            <font-awesome-icon icon="play" />
          </button>
        </li>
        <li>
          <button class="controller__btn">
            <font-awesome-icon icon="check" />
          </button>
        </li>
        <li>
          <button class="controller__btn">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          </button>
        </li>
        <li>
          <button class="controller__btn">
            <font-awesome-icon :icon="['far', 'thumbs-up']" />
          </button>
        </li>
        <li>
          <button class="controller__btn">
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          </button>
        </li>
        <li>
          <button class="controller__btn">
            <font-awesome-icon :icon="['far', 'thumbs-down']" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import poster from "../assets/images/avengers.jpg";

export default {
  name: "MovieCard",
  data() {
    return {
      poster: poster
    };
  }
};
</script>

<style>
.movieCard {
  width: 250px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
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
  padding: 0.55rem 0.65rem;
  font-size: 0.75rem;
}

.movieCard__title {
  margin-bottom: 0.5rem;
  font-family: "Nanum Pen Script", cursive;
  font-size: 2rem;
  color: white;
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

/* .movieCard__controller__btnWrapper li:last-child {
  margin-left: auto;
} */
</style>