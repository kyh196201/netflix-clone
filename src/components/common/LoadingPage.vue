<template>
  <section class="loading-page">
    <div class="skeleton-page">
      <ul class="skeleton-list">
        <li class="skeleton-item" v-for="index in 10" :key="index">
          <div class="fadeInBg" :style="{ animationDelay : animationDelay(index) }"></div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoadingGrid",
  data() {
    return {
      delay: 0.25
    };
  },
  computed: {
    animationDelay() {
      return index => {
        const delay = index * this.delay;
        return `${delay}s`;
      };
    }
  }
};
</script>

<style>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.skeleton-page {
  width: 100%;
  height: 100%;
  padding: 2%;
  padding-top: 100px;
  background-color: #000000;
}

.skeleton-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -0.5rem;
}

.skeleton-item {
  flex: 1 1;
  flex-basis: 20%;
  padding: 0.25rem;
}

.skeleton-item > div {
  width: 100%;
  padding-bottom: 56.25%;
  background-color: var(--skeleton-color);
  border-radius: 5px;
}
</style>
