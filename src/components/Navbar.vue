<template>
  <nav class="home__nav nav fixed">
    <!-- 네비게이션 왼쪽 섹션 -->
    <div class="home__nav__left">
      <!-- 사이트 로고 -->
      <router-link to="/browse" class="home__nav__logo"></router-link>
      <!-- 페이지 링크 -->
      <ul class="home__nav__links" v-if="isProfile">
        <li v-for="(link, index) in links" :key="index" ref="navLink">
          <router-link
            class="navLink"
            :to="link.route"
            :class="{ active: isActive(link.route) }"
          >{{ link.title }}</router-link>
        </li>
      </ul>
    </div>

    <!-- 네비게이션 오른쪽 섹션 -->
    <div class="home__nav__right" v-if="isProfile">
      <ul>
        <!-- 검색 버튼 -->
        <li>
          <search-input v-if="isSearching" @close="isSearching = false" />
          <div v-else>
            <a href="#" class="nav__right__icons" @click.prevent="openSearch">
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
import SearchInput from "./SearchInput.vue";
import { mapState } from "vuex";
import throttle from "@/utils/throttle.js";

const links = [
  {
    title: "홈",
    route: "/browse"
  },
  {
    title: "TV 프로그램",
    route: "/browse/genre/83"
  },
  {
    title: "영화",
    route: "/browse/movie"
  },
  {
    title: "최신 콘텐츠",
    route: "/browse/latest"
  },
  {
    title: "내가 찜한 콘텐츠",
    route: "/browse/my-list"
  }
];

export default {
  name: "NavBar",
  components: {
    "search-input": SearchInput
  },
  data() {
    return {
      logoImage: logoImage,
      avtarImage: avtarImage,
      links: links,
      isBgBlack: false
    };
  },
  computed: {
    ...mapState({
      isProfile: state => state.isProfile,
      isSearching: state => state.isSearching
    })
  },
  created() {
    document.addEventListener("scroll", throttle(this.onScroll, 250));
  },
  methods: {
    isActive(path) {
      return path === this.$route.path;
    },
    openSearch() {
      this.$store.commit("SET_IS_SEARCHING", true);
    },
    onScroll(event) {
      const BLACK_CN = "black";

      if (window.scrollY <= 0) {
        this.$el.classList.remove(BLACK_CN);
        this.isBgBlack = false;
      } else if (window.scrollY > 0) {
        if (this.isBgBlack) return;

        this.isBgBlack = true;
        this.$el.classList.add(BLACK_CN);
      }
    }
  }
};
</script>

<style>
.home__nav {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 40px 0 10px;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
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
  transition: background-color 0.5s linear 0s;
}

.home__nav.fixed {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1280px;
  height: 60px;
}

.home__nav.black {
  background-color: var(--black-color);
}

.home__nav > .home__nav__left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

/* 헤더 로고 */
.home__nav__logo {
  display: block;
  width: 140px;
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
  padding: 8px;
  font-weight: normal;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
  text-decoration: none;
}

.home__nav__links > li > a:hover {
  color: rgba(255, 255, 255, 0.5);
}

.home__nav__links > li > a.active {
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

/* 헤더 오른쪽 섹션 */
.home__nav__right > ul {
  display: flex;
  align-items: center;
}

.nav__right__icons {
  padding: 4px 16px;
}

.nav__right__icons {
  color: #fff;
  font-size: 16px;
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
  margin-left: 12px;
  color: #fff;
}
</style>
