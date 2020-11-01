<template>
    <header class="home__header">
        <nav class="home__nav nav">
            <!-- 네비게이션 왼쪽 섹션 -->
            <div class="home__nav__left">
                <!-- 사이트 로고 -->
                <a href="#" class="home__nav__logo">
                    <figure>
                        <img :src="logoImage" alt="home__logo" />
                    </figure>
                </a>
                <!-- 페이지 링크 -->
                <ul class="home__nav__links">
                    <li>
                        <a href="#">홈</a>
                    </li>
                    <li>
                        <a href="#">TV 프로그램</a>
                    </li>
                    <li>
                        <a href="#">영화</a>
                    </li>
                    <li>
                        <a href="#">최신 콘텐츠</a>
                    </li>
                    <li>
                        <a href="#">내가 찜한 콘텐츠</a>
                    </li>
                </ul>
            </div>

            <!-- 네비게이션 오른쪽 섹션 -->
            <div class="home__nav__right">
                <ul>
                    <!-- 검색 버튼 -->
                    <li>
                        <a href="#">
                            <font-awesome-icon icon="search" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome-icon icon="gift" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <font-awesome-icon icon="bell" />
                        </a>
                    </li>
                    <!-- 프로필 섹션 -->
                    <li>
                        <div class="nav__profile-container">
                            <div class="nav__profile-btn">
                                <!-- 프로필 이미지 -->
                                <figure class="nav__profile__img">
                                    <img src="" alt="profile-img" />
                                </figure>
                                <span class="nav__profile__dropdown-btn"></span>
                            </div>
                            <!-- 프로필 설정 섹션 -->
                            <ul></ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import logoImage from "../assets/images/logo2.png";

export default {
    name: "Navbar",
    data() {
        return {
            logoImage: logoImage,
        };
    },
};
</script>

<style></style>
