<template>
  <div class="movie-tagList">
    <span class="movie-tagList__title">{{ title }}</span>
    <MovieTagItem v-for="(item, index) in list" :key="index" :item="item"></MovieTagItem>
  </div>
</template>

<script>
import MovieTagItem from "@/components/movie/MovieTagItem.vue";
export default {
  components: {
    MovieTagItem
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.movie-tagList {
  font-size: 1em;
}

.movie-tagList__title {
  color: gray;
}

.movie-tagList__title:after {
  display: inline;
  content: ":";
}

.movie-tagList__tag {
  margin: 0 0.25em;
  font-weight: bold;
  color: var(--white-color);
  line-height: 1.5;
}

.movie-tagList__tag.more {
  font-style: italic;
}

.movie-tagList__tag:not(:last-child):after {
  display: inline;
  content: ",";
}
</style>