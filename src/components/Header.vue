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
  /* background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.9),
        rgba(178, 178, 178, 0.4)
    ); */
  z-index: 100;
}
</style>