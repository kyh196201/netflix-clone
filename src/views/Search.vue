<template>
    <section class="search">
        <search-history />
        <search-result v-if="movieList && movieList.length" :data="movieList" />
        <no-result v-else />
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
        return {};
    },
    computed: {
        ...mapState({
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
        isQuery() {
            return !!this.$route.query.q;
        },
    },
    created() {
        if (!this.isQuery) {
            this.$router.push("/browse");
        }

        this.SET_IS_SEARCHING(true);
    },
    methods: {
        ...mapMutations(["SET_IS_SEARCHING"]),
    },
};
</script>

<style>
.search {
    padding: 130px 30px 0;
    min-height: 100vh;
}
</style>
