<template>
  <ul class="optionList genre-list horizontal">
    <li class="optionList__item" v-for="genre in genres" :key="genre.id">
      <a
        href="#"
        :data-genre-id="genre.id"
        @click.prevent="$emit('click', genre.id)"
      >{{ genre.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "GenreList",
  props: ["genres"],
  mounted() {
    console.log("mounted");
  }
};
</script>

<style>
.genre-list {
  width: 300px;
}

.genre-list .optionList__item {
  width: 33.3333%;
}

.genre-list .optionList__item a {
  line-height: 1.5;
}
</style>