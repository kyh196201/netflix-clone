<template>
    <div class="searchHistory">
        <span class="searchHistory__title">최근 검색 키워드:</span>
        <ul class="searchHistory__list">
            <li class="searchHistory__list__item">
                <a href="#" class="searchHistory__list__keyword">반지의 제왕</a>
            </li>
            <li class="searchHistory__list__item">
                <a href="#" class="searchHistory__list__keyword">다크나이트</a>
            </li>
            <li class="searchHistory__list__item">
                <a href="#" class="searchHistory__list__keyword">쇼생크 탈출</a>
            </li>
            <li class="searchHistory__list__item">
                <a href="#" class="searchHistory__list__keyword"
                    >포레스트 검프</a
                >
            </li>
            <li class="searchHistory__list__item">
                <a href="#" class="searchHistory__list__keyword"
                    >반지의 제왕 두개의 탑</a
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SearchHistory",
};
</script>

<style>
.searchHistory {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;
    font-size: 16px;
}

.searchHistory__title {
    margin-right: 15px;
    font-size: 16.5px;
    color: grey;
}

.searchHistory__list {
    display: flex;
    flex: 1 1;
    flex-wrap: wrap;
}

.searchHistory__list__item:not(:last-child) {
    margin-right: 20px;
}

.searchHistory__list__keyword {
    display: block;
    position: relative;
    height: 25px;
    padding: 0 5px;
    color: white;
    text-decoration: none;
}

.searchHistory__list__keyword:after {
    display: block;
    position: absolute;
    width: 2px;
    height: 20px;
    top: 0;
    right: -10px;
    background-color: rgba(255, 255, 255, 0.5);
    content: "";
}

.searchHistory__list__item:last-child .searchHistory__list__keyword::after {
    display: none;
}

.searchHistory__list__keyword:hover {
    color: #e50914;
}
</style>
