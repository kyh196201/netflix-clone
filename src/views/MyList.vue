<template>
  <div class="myList">
    <div class="myList__container" v-if="!isLoading">
      <div class="myList__list--wrapper" v-if="list && list.length">
        <ul class="myList__list">
          <li class="myList__listItem" v-for="item in list" :key="item.id">
            <MovieCard :data="item" :data-id="item.id" />
          </li>
        </ul>
      </div>
      <p class="myList__notice" v-else>찜한 콘텐츠가 없습니다 😒</p>
    </div>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import { mapState } from "vuex";

export default {
  name: "MyList",
  components: {
    MovieCard
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      list: state => state.myList
    })
  }
};
</script>

<style>
.myList {
  width: 100%;
  height: 100vh;
  margin-top: 30px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.myList__container {
  padding: 0 30px;
}

.myList__list--wrapper {
  width: 100%;
}

.myList__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.myList__listItem {
  width: 250px;
  margin: 0 1.5rem 1.5rem 0;
}

.myList__notice {
  padding: 5rem 0;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  line-height: 1.5;
}

@media screen and (max-width: 1450px) {
  .myList__listItem {
    width: 220px;
    font-size: 90%;
  }
}
</style>