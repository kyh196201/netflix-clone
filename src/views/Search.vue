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
    data() {
        return {
            keyword: "",
        };
    },
    computed: {
        ...mapState({
            isSearching: (state) => state.isSearching,
        }),
    },
    created() {
        const q = this.$route.query.q;
        this.keyword = q ? decodeURIComponent(q) : null;

        if (!this.keyword) {
            this.$router.push("/browse");
        }
    },
    methods: {
        ...mapMutations(["SET_IS_SEARCHING"]),
    },
};
</script>

<style>
.search {
    padding: 150px 30px 30px;
    min-height: 100vh;
}
</style>
