<template>
  <section class="loading-grid">
    <div class="skeleton-grid">
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
    //   TODO 복습하기
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
.loading-grid {
  width: 100%;
  height: 100vh;
}

.skeleton-grid {
  width: 100%;
  padding: 2%;
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
  background-color: #212529;
  border-radius: 5px;
}
</style>
