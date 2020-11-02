<template>
  <header class="home__header">
    <nav-bar />
  </header>
</template>

<script>
import NavBar from "./Navbar.vue";

export default {
  name: "Header",
  components: {
    "nav-bar": NavBar
  }
};
</script>

<style>
.home__header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
}
</style>