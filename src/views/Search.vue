<template>
    <section class="search">
        This is Search & keyword => {{ keyword }}
        <search-history />
        <search-result />
    </section>
</template>

<script>
import SearchResult from "../components/SearchResult.vue";
import SearchHistory from "../components/SearchHistory.vue";

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
    created() {
        const q = this.$route.query.q;
        this.keyword = decodeURIComponent(q);
    },
};
</script>

<style>
.search {
    padding: 150px 30px 30px;
}
</style>
