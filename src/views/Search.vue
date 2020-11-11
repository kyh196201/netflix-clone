<template>
    <section class="search">
        <search-history />
        <search-result v-if="movieList && movieList.length" :data="movieList" />
        <no-result v-else :keyword="inputKeyword" />
    </section>
</template>

<script>
import SearchResult from "../components/SearchResult.vue";
import SearchHistory from "../components/SearchHistory.vue";
import NoResult from "../components/NoResult.vue";
import { mapState, mapMutations } from "vuex";

export default {
    name: "search",
    components: {
        "search-result": SearchResult,
        "search-history": SearchHistory,
        "no-result": NoResult,
    },
    data() {
        return {
            inputKeyword: "",
        };
    },
    computed: {
        ...mapState({
            isSearching: (state) => state.isSearching,
            keyword: (state) => state.searchKeyword,
            list: (state) => state.searchResult,
        }),
        page() {
            return this.list.page;
        },
        totalPage() {
            return this.list["total_pages"];
        },
        movieList() {
            return this.list.results;
        },
        isMoreData() {
            return this.totalPage > this.page;
        },
    },
    created() {
        if (!this.keyword) {
            this.$router.push("/browse");
        }

        this.SET_IS_SEARCHING(true);
        this.inputKeyword = this.keyword;
    },
    methods: {
        ...mapMutations(["SET_IS_SEARCHING"]),
    },
};
</script>

<style>
.search {
    padding: 130px 30px 30px;
    min-height: 100vh;
}
</style>
