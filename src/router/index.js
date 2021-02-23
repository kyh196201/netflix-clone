import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import { setPrevRoute } from "@/utils/helpers/prevRoute.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/browse",
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search.vue"),
  },
  {
    path: "/browse",
    component: () => import("@/views/Browse.vue"),
    children: [
      {
        path: "",
        name: "BrowseHome",
        component: () => import("@/views/BrowseHome.vue"),
      },
      {
        path: "latest",
        name: "Latest",
        component: () => import("@/views/Latest.vue"),
      },
      {
        path: "my-list",
        name: "MyList",
        component: () => import("@/views/MyList.vue"),
      },
      {
        path: "movie2",
        name: "Movie",
        component: () => import("@/views/Movie.vue"),
      },
      {
        path: "movie",
        name: "MoviePage",
        component: () => import("@/views/MoviePage.vue"),
      },
      {
        path: "person/:pid",
        name: "Person",
        component: () => import("@/views/Person.vue"),
        props: true,
      },
    ],
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from) => {
  setPrevRoute(from);

  // 라우트에 movieId 쿼리가 있으면, 영화 상세 모달 노출
  if (to.query.movieId) {
    store.commit("movie/SET_IS_DETAIL_MODAL", true);
  }
});

export default router;
