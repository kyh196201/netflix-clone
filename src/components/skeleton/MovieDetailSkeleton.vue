<template>
  <section class="movieDetail__content movieDetail-skeleton">
    <!-- 이미지 영역 -->
    <div class="skeleton__backdrop-wrapper">
      <div class="skeleton__backdrop"></div>
    </div>
    <!-- 정보 영역 -->
    <div class="movieDetail__info-wrapper">
      <div class="movieDetail__info">
        <div>
          <div class="movieDetail__basicInfo">
            <span class="movieDetail__releaseDate">{{ releaseDate }}</span>
            <!-- <span class="movieDetail__maturity-rating">12</span> -->
            <span class="movieDetail__runTime">{{ runtime }}</span>
            <span class="movieDetail__vote">{{ vote }}</span>
          </div>
          <div class="movieDetail__overview" v-if="overview">{{overview}}</div>
          <p v-else>줄거리가 없습니다.</p>
        </div>
        <div class="movieDetail__info__tagList">
          <!-- 영화 태그들 -->
          <MovieTagList :list="actors" title="출연"></MovieTagList>
          <MovieTagList :list="directors" title="제작"></MovieTagList>
          <MovieTagList :list="genres" title="장르"></MovieTagList>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.movieDetail-skeleton {
  background-color: #292929;
  color: var(--white-color);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.skeleton__backdrop {
  width: 100%;
  padding-top: 56.2%;
  background-color: var(--black-color);
}
</style>