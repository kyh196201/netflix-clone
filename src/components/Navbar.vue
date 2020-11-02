<template>
  <nav class="home__nav nav">
    <!-- 네비게이션 왼쪽 섹션 -->
    <div class="home__nav__left">
      <!-- 사이트 로고 -->
      <router-link to="/browse" class="home__nav__logo"></router-link>
      <!-- 페이지 링크 -->
      <ul class="home__nav__links" v-if="isProfile">
        <li class="active">
          <router-link to="/browse">홈</router-link>
        </li>
        <li>
          <router-link to="/browse/genre/83">TV 프로그램</router-link>
        </li>
        <li>
          <router-link to="/browse/genre/84">영화</router-link>
        </li>
        <li>
          <router-link to="/browse/latest">최신 콘텐츠</router-link>
        </li>
        <li>
          <router-link to="/browse/my-list">내가 찜한 콘텐츠</router-link>
        </li>
      </ul>
    </div>

    <!-- 네비게이션 오른쪽 섹션 -->
    <div class="home__nav__right" v-if="isProfile">
      <ul>
        <!-- 검색 버튼 -->
        <li>
          <div>
            <a href="#" class="nav__right__icons">
              <font-awesome-icon icon="search" />
            </a>
          </div>
        </li>
        <li>
          <div>
            <a href="#" class="nav__right__icons">
              <font-awesome-icon icon="gift" />
            </a>
          </div>
        </li>
        <li>
          <div>
            <a href="#" class="nav__right__icons">
              <font-awesome-icon icon="bell" />
            </a>
          </div>
        </li>
        <!-- 프로필 섹션 -->
        <li>
          <div class="nav__profile-container">
            <a class="nav__profile-wrapper">
              <!-- 프로필 이미지 -->
              <figure>
                <img class="nav__profile" :src="avtarImage" alt="profile-img" />
              </figure>
              <span class="nav__profile__dropdown-btn">
                <font-awesome-icon icon="caret-down" />
              </span>
            </a>
            <!-- 프로필 설정 섹션 -->
            <ul></ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import logoImage from "../assets/images/logo2.png";
import avtarImage from "../assets/images/avatar.jpg";
import { mapState } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      logoImage: logoImage,
      avtarImage: avtarImage
    };
  },
  computed: {
    ...mapState(["isProfile"])
  }
};
</script>

<style>
.home__nav {
  display: flex;
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0;
  align-items: center;
  justify-content: space-between;
}

.home__nav > .home__nav__left {
  display: flex;
  align-items: center;
}

/* 헤더 로고 */
.home__nav__logo {
  display: block;
  width: 120px;
  height: 35px;
  background-image: url("../assets/images/netflix-logo.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

/* 헤더 링크 */
.home__nav__links {
  display: flex;
  align-items: center;
}

.home__nav__links > li > a {
  display: block;
  padding: 0.5rem;
  font-weight: normal;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
  text-decoration: none;
}

.home__nav__links > li:hover > a {
  color: rgba(255, 255, 255, 0.5);
}

.home__nav__links > li.active > a {
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

/* 헤더 오른쪽 섹션 */
.home__nav__right > ul {
  display: flex;
  align-items: center;
}

.home__nav__right > ul > li > div > a {
  padding: 0.25rem 0.8rem;
}

.nav__right__icons {
  color: #fff;
  font-size: 1rem;
}

/* 프로필 이미지 */
.nav__profile-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav__profile {
  overflow: hidden;
}

.nav__profile {
  width: 35px;
  height: 35px;
  border-radius: 5px;
}

.nav__profile__dropdown-btn {
  display: block;
  margin-left: 0.75rem;
  color: #fff;
}
</style>
