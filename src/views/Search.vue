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
import { mapState, mapMutations, mapActions } from "vuex";

export default {
    name: "search",
    components: {
        "search-result": SearchResult,
        "search-history": SearchHistory,
        "no-result": NoResult,
    },
    data() {
        return {
            currentPage: 1,
            keyword: "",
        };
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
    watch: {
        $route: {
            handler(value) {
                console.log(value);

                let queryString = value.query.q;

                if (!queryString) {
                    this.$router.push("/browse");
                }

                this.SET_IS_SEARCHING(true);
                this.keyword = decodeURIComponent(queryString);
                this.fetchData();
            },
            immediate: true,
        },
    },
    methods: {
        ...mapMutations(["SET_IS_SEARCHING"]),
        ...mapActions(["SEARCH_MOVIE"]),
        async fetchData() {
            try {
                await this.SEARCH_MOVIE({
                    query: this.keyword,
                    page: this.currentPage,
                });
            } catch (err) {
                console.error(err);
                alert("에러 발생!!");
            }
        },
    },
};
</script>

<style>
.search {
    padding: 130px 30px 0;
    min-height: 100vh;
}
</style>
