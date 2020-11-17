<template>
    <Modal class="detailView">
        <div class="detailView__header" slot="header">
            DetailView header
        </div>
        <div class="detailView__content" slot="body">
            <pre>
                {{ detail }}
            </pre>
        </div>
        <div class="detailView__footer" slot="footer">
            <button @click.prevent="$router.go(-1)">close</button>
        </div>
    </Modal>
</template>

<script>
import Modal from "../components/Modal.vue";
import { mapActions, mapState } from "vuex";

export default {
    name: "Detail",
    components: {
        Modal,
    },
    data() {
        return {
            movieId: "",
        };
    },
    computed: {
        ...mapState({
            detail: (state) => state.movieDetail,
        }),
    },
    created() {
        this.movieId = this.$route.params.mid;
        this.fetchData();
    },
    methods: {
        ...mapActions(["FETCH_MOVIE"]),
        async fetchData() {
            await this.FETCH_MOVIE({
                id: this.movieId,
            });
        },
    },
};
</script>

<style></style>
