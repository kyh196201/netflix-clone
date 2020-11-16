<template>
    <div class="searchHistory">
        <span class="searchHistory__title">최근 검색 키워드:</span>
        <ul class="searchHistory__list">
            <li
                class="searchHistory__list__item"
                v-for="(item, index) in history"
                :key="index"
                data-index="index"
            >
                <router-link
                    :to="`/search?q=${encodeURIComponent(item)}`"
                    class="searchHistory__list__keyword"
                >
                    {{ item }}
                </router-link>
                <button
                    class="searchHistory__list__closeBtn"
                    @click="onDelete(index)"
                >
                    &times;
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "SearchHistory",
    computed: {
        ...mapState({
            history: (state) => state.searchHistory,
        }),
    },
    methods: {
        ...mapActions(["DELETE_SEARCH_HISTORY"]),
        onDelete(index) {
            if (!window.confirm("검색 기록을 삭제하시겠습니까??")) return;

            this.DELETE_SEARCH_HISTORY({ index: index * 1 });
        },
    },
};
</script>

<style>
.searchHistory {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;
    padding: 5px;
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

.searchHistory__list__item {
    display: flex;
    align-items: center;
    position: relative;
}

.searchHistory__list__item:not(:last-child) {
    margin-right: 20px;
}

.searchHistory__list__keyword {
    display: block;
    /* height: 25px; */
    padding: 0 5px;
    color: white;
    text-decoration: none;
}

.searchHistory__list__item:after {
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

.searchHistory__list__keyword:hover,
.searchHistory__list__closeBtn:hover {
    color: #e50914;
}

.searchHistory__list__closeBtn {
    border: none;
    outline: none;
    background-color: transparent;
    color: white;
    font-size: 16px;
    cursor: pointer;
}
</style>
