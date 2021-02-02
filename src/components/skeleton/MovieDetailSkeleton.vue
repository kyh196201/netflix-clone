<template>
  <section class="movieDetail__content skeleton">
    <!-- 이미지 영역 -->
    <div class="movieDetail__backdrop-wrapper">
      <div class="skeleton-backdrop"></div>
    </div>
    <!-- 정보 영역 -->
    <div class="movieDetail__info-wrapper">
      <div class="movieDetail__info">
        <div>
          <div class="movieDetail__basicInfo">
            <span class="skeleton-bar"></span>
            <span class="skeleton-bar"></span>
            <span class="skeleton-bar"></span>
          </div>
          <div class="movieDetail__overview">
            <div class="skeleton-content"></div>
          </div>
        </div>
        <div class="movieDetail__info__tagList">
          <div class="skeleton-bar"></div>
          <div class="skeleton-bar"></div>
          <div class="skeleton-bar"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
.movieDetail__content.skeleton {
  background: rgba(0, 0, 0, 0.95);
}

.skeleton-backdrop {
  width: 100%;
  padding-top: 56.2%;
  background-color: var(--black-color);
}

.skeleton .movieDetail__info {
  display: flex;
  padding: 2rem 3rem;
  font-size: 1.5rem;
}

.skeleton .movieDetail__info div:first-child {
  flex-basis: 70%;
  padding-right: 5rem;
}

.skeleton .movieDetail__basicInfo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
}

.movieDetail__basicInfo .skeleton-bar {
  width: 10em;
  height: 1em;
  border-radius: 3px;
}

.movieDetail__basicInfo .skeleton-bar:not(:last-child) {
  margin-right: 1em;
}

.movieDetail__overview .skeleton-content {
  width: 100%;
  height: 6.25em;
}

.skeleton .movieDetail__info__tagList {
  flex: 1;
}

.movieDetail__info__tagList .skeleton-bar {
  width: 100%;
  height: 1em;
}

.movieDetail__info__tagList .skeleton-bar:not(:last-child) {
  margin-bottom: 1em;
}
</style>