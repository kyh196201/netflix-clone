<template>
  <div class="movieCard">
    <div class="movieCard__image-wrapper">
      <figure class="movieCard__image">
        <img :src="poster" alt />
      </figure>
    </div>
    <div class="movieCard__info">
      <div class="movieCard__controller">
        <div class="controller__left">
          <a href="#" class="controller__btn play">
            <font-awesome-icon icon="play" />
          </a>
          <a href="#" class="controller__btn">
            <font-awesome-icon icon="check" />
          </a>
          <a href="#" class="controller__btn">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          </a>
          <a href="#" class="controller__btn">
            <font-awesome-icon :icon="['far', 'thumbs-up']" />
          </a>
          <a href="#" class="controller__btn">
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          </a>
          <a href="#" class="controller__btn">
            <font-awesome-icon :icon="['far', 'thumbs-down']" />
          </a>
        </div>
        <div class="controller__right">
          <a href="#" class="controller__btn">
            <font-awesome-icon icon="plus" />
          </a>
        </div>
      </div>
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
  width: 100%;
  max-width: 250px;
  box-shadow: rgba(0, 0, 0, 0.75);
}

.movieCard__image-wrapper {
  position: relative;
  width: 100%;
  max-height: 150px;
}

.movieCard__image {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 60%;
}

.movieCard__image img {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.movieCard__info {
  padding: 2rem 1rem;
  background-color: #181818;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.movieCard__controller {
  display: flex;
  justify-content: space-between;
}

.controller__left .controller__btn:not(:last-child) {
  margin-right: 0.3rem;
}
</style>