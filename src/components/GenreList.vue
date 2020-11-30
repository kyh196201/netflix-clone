<template>
  <ul class="option-list genre-list">
    <li class="option-listItem" v-for="genre in genres" :key="genre.id">
      <a href="#" :data-genre-id="genre.id" @click.prevent="$emit('click', genre)">{{ genre.name }}</a>
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