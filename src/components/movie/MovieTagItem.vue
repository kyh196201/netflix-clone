<template>
  <router-link class="movie-tagList__tag" :to="path">{{ item.name }}</router-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    tagType: {
      type: String,
      required: true
    }
  },
  computed: {
    path() {
      return `/${this.tagType.type}/` + this.item.id;
    }
  }
};
</script>

<style>
</style>