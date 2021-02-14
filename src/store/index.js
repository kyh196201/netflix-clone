import Vue from "vue";
import Vuex from "vuex";
import state from "./state.js";
import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

//modules
import movie from "./movie";
import user from "./user";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    movie,
    user,
  },
});

export default store;

// const myList = JSON.parse(localStorage.getItem("myList")) || [];
// const favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
// const hateList = JSON.parse(localStorage.getItem("hateList")) || [];

// store.commit("SET_MY_LIST", myList);
// store.commit("SET_FAVORITE_LIST", favoriteList);
// store.commit("SET_HATE_LIST", hateList);
