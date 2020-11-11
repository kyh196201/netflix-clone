<template>
    <section class="search">
        <search-history />
        <search-result />
    </section>
</template>

<script>
import SearchResult from "../components/SearchResult.vue";
import SearchHistory from "../components/SearchHistory.vue";
import { mapState, mapMutations } from "vuex";

export default {
    name: "search",
    components: {
        "search-result": SearchResult,
        "search-history": SearchHistory,
    },
    computed: {
        ...mapState({
            isSearching: (state) => state.isSearching,
            keyword: (state) => state.searchKeyword,
        }),
    },
    created() {
        if (!this.keyword) {
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
    padding: 130px 30px 30px;
    min-height: 100vh;
}
</style>
