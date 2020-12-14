<template>
  <header class="home__header">
    <div class="nav-wrapper">
      <NavBar />
    </div>
  </header>
</template>

<script>
import NavBar from "./Navbar.vue";

export default {
  name: "Header",
  components: {
    NavBar: NavBar
  }
};
</script>

<style>
.home__header {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 10;
}

.nav-wrapper {
  width: 100%;
  height: 100%;
}
</style>
