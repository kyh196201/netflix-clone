<template>
  <section class="movie-page">
    <h2 class="blind">영화 페이지</h2>

    <!-- 헤더 -->
    <header class="movie-page__header">
      <h3 class="blind">영화 페이지 헤더</h3>
      <div class="movie-page__header__inner">
        <!-- 헤더 왼쪽 -->
        <div class="movie-page__header__left">
          <!-- 페이지 타이틀 -->
          <div class="movie-page__title">
            <span class="movie-page__subtitle">{{ pageName }}</span>
            <span class="movie-page__maintitle">{{ selectedGenre }}</span>
          </div>

          <!-- 영화 장르 -->
          <div class="movie-page__genres">
            <div class="genres">
              <!-- 장르 셀렉터 -->
              <button class="genres__title">
                장르
                <span class="genres__title__icon">
                  <font-awesome-icon icon="caret-down" />
                </span>
              </button>

              <!-- 장르 리스트 컨테이너 -->
              <div class="genres__list-container">
                <!-- 장르 리스트 -->
                <ul class="genres__list">
                  <li class="genres__item">
                    <a href="#" class="genres__link">설 연휴 정주행 가이드</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">한국</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">미국 영화</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">영화제 수상작</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">인디</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">어린이/가족</a>
                  </li>
                </ul>

                <ul class="genres__list">
                  <li class="genres__item">
                    <a href="#" class="genres__link">애니메이션</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">액션</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">미국</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">영화제</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">인디</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">어린이</a>
                  </li>
                </ul>

                <ul class="genres__list">
                  <li class="genres__item">
                    <a href="#" class="genres__link">판타지</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">액션</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">다큐멘터리</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">음악/뮤지컬</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">인디</a>
                  </li>
                  <li class="genres__item">
                    <a href="#" class="genres__link">어린이</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 헤더 오른쪽 -->
        <div class="movie-page__header__right">
          <!-- 영화 필터 -->
          <div class="movie-page__filters">
            <div class="filters">
              <!-- 필터 제목 -->
              <button class="filters__button">
                <span class="filters__title">추천 콘텐츠</span>
                <span class="filters__icon">
                  <font-awesome-icon icon="caret-down" />
                </span>
              </button>

              <!-- 필터 리스트 -->
              <div class="filters__list-container">
                <ul class="filters__list">
                  <li class="filters__item">
                    추천 콘텐츠
                  </li>
                  <li class="filters__item">
                    출시일순
                  </li>
                  <li class="filters__item">
                    오름차순(ㄱ-Z)
                  </li>
                  <li class="filters__item">
                    내림차순(Z-ㄱ)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 헤더 오른쪽 끝 -->
      </div>
    </header>

    <!-- 영화 리스트 -->
    <section class="movie-section">
      <h3 class="blind">영화 리스트</h3>
      <div class="movie-section__row">
        <div class="movie-list">
          <div class="movie-list__item">
            <a href="#" class="movie-list__link">
              <figure class="movie-list__poster">
                <img
                  src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1ZgO/image/7fQUFh8JeRGH4JGLAPayJp7_XGo.jpeg"
                  alt="영화 포스터"
                />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { getGenres } from "@/api";

export default {
  data() {
    return {
      pageName: "영화",

      // 장르
      genres: [],

      // 선택된 장르
      selectedGenre: null,
    };
  },

  created() {
    getGenres().then((res) => console.log(res));
  },
};
</script>

<style scoped>
/* 헤더 */
.movie-page__header {
  height: 100px;
  border: 3px solid var(--red-color);
}

/* 헤더 inner */
.movie-page__header__inner {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 0 40px;
  border: 3px solid var(--blue-color);
}

.movie-page__header.fixed .movie-page__header__inner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

/* 헤더 left */
.movie-page__header__left {
  display: flex;
  align-items: center;
}

/* 페이지 타이틀 */
.movie-page__title {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.movie-page__subtitle {
  margin-right: 10px;
  color: var(--grey-color);
  font-size: 22px;
}

.movie-page__subtitle:after {
  display: inline;
  margin-left: 10px;
  content: ">";
}

.movie-page__maintitle {
  font-size: 30px;
  font-weight: bold;
  color: var(--white-color);
}

/* 영화 장르 영역 */
.movie-page__genres .genres {
  position: relative;
  color: var(--white-color);
  background-color: var(--black-color);
}

.movie-page__genres .genres__title {
  display: inline-block;
  padding: 3px 8px;
  font-size: 12px;
  color: inherit;
  background-color: inherit;
  border: 1px solid var(--white-color);
  outline: none;
  cursor: pointer;
}

.movie-page__genres .genres__title:hover,
.movie-page__genres .genres__title:focus {
  background-color: rgba(255, 255, 255, 0.3);
}

.movie-page__genres .genres__title .genres__title__icon {
  margin-left: 30px;
}

/* 장르 리스트 */
.genres__list-container {
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px;
  font-size: 0px;
  border: 1px solid var(--grey-color);
  background-color: rgba(0, 0, 0, 0.9);
  white-space: nowrap;
}

.movie-page__genres .genres__list {
  display: inline-block;
  margin-right: 30px;
  font-size: 14px;
}

.movie-page__genres .genres__list:last-child {
  margin-right: 0;
}

.movie-page__genres .genres__item {
  margin-bottom: 10px;
}

.movie-page__genres .genres__item:last-child {
  margin-bottom: 0;
}

.movie-page__genres .genres__link {
  display: block;
}

.movie-page__genres .genres__link:hover {
  text-decoration: underline;
}

/* 헤더 오른쪽 */
.movie-page__header__right {
  display: flex;
  align-items: center;
}

.movie-page .filters {
  position: relative;
}

.movie-page .filters__button {
  display: inline-block;
  padding: 3px 8px;
  font-size: 14px;
  background-color: var(--black-color);
  color: var(--white-color);
  border: 1px solid var(--white-color);
  outline: none;
  cursor: pointer;
}

.movie-page .filters__title {
  margin-right: 150px;
}

.movie-page .filters__list-container {
  position: absolute;
  top: 100%;
  right: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid var(--white-color);
  color: var(--white-color);
}

.movie-page .filters__list {
  min-width: 200px;
}

.movie-page .filters__item {
  font-size: 14px;
  margin-bottom: 5px;
}

.movie-page .filters__item:last-child {
  margin: 0;
}
</style>
