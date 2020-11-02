<template>
  <div class="browse__genre">This is Genre & genre Id is {{id}}</div>
</template>

<script>
export default {
  name: "Genre",
  data() {
    return {
      id: null
    };
  },
  watch: {
    $route: {
      handler: function() {
        this.id = this.$route.params.id;
      },
      immediate: true
    }
  }
};
</script>