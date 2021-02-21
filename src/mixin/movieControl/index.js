import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("user", {
      myList: (state) => state.myList,
      likeList: (state) => state.likeList,
      hateList: (state) => state.hateList,
    }),

    ...mapGetters("user", ["isInMyList", "isInLikeList", "isInHateList"]),
  },

  methods: {
    ...mapActions("user", [
      // my list actions
      "ADD_MOVIE_TO_MY_LIST",
      "REMOVE_FROM_MY_LIST",

      // like list actions
      "ADD_MOVIE_TO_LIKE_LIST",
      "REMOVE_FROM_LIKE_LIST",

      // hate list actions
      "ADD_MOVIE_TO_HATE_LIST",
      "REMOVE_FROM_HATE_LIST",
    ]),

    // my list
    addMyList(movie) {
      this.ADD_MOVIE_TO_MY_LIST(movie);
    },
    removeMyList(movie) {
      this.REMOVE_FROM_MY_LIST(movie.id);
    },

    // like list
    addLikeList(movie) {
      this.ADD_MOVIE_TO_LIKE_LIST(movie);
    },
    removeLikeList(movie) {
      this.REMOVE_FROM_LIKE_LIST(movie.id);
    },

    // hate list
    addHateList(movie) {
      this.ADD_MOVIE_TO_HATE_LIST(movie);
    },
    removeHateList(movie) {
      this.REMOVE_FROM_HATE_LIST(movie.id);
    },
  },
};
