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
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(10%, rgba(0, 0, 0, 0.7)),
    color-stop(10%, rgba(0, 0, 0, 0))
  );
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  background-image: -moz-
    oldlinear-gradient(top, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0));
  background-image: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  z-index: 100;
}
</style>