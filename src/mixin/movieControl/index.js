import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("user", {
      myList: (state) => state.myList,
    }),

    ...mapGetters("user", ["isInMyList"]),
  },

  methods: {
    ...mapActions("user", ["ADD_MOVIE_TO_MY_LIST", "REMOVE_FROM_MY_LIST"]),
    addMyList(movie) {
      this.ADD_MOVIE_TO_MY_LIST(movie);
    },
    removeMyList({ id }) {
      this.REMOVE_FROM_MY_LIST(id);
    },
  },
};
