import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Browse from "../views/Browse.vue";
import BrowseHome from "../views/BrowseHome.vue";
import Latest from "../views/Latest.vue";
import MyList from "../views/MyList.vue";
import Person from "../views/Person.vue";
import Genre from "../views/Genre.vue";
import Movie from "../views/Movie.vue";
import Search from "../views/Search.vue";
import DetailView from "../views/DetailView.vue";
import NotFound from "../views/NotFound.vue";

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
                children: [
                    {
                        path: "detail/:mid",
                        name: "DetailView",
                        component: () => import("@/views/DetailView.vue"),
                        props: true,
                    },
                ],
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
                path: "movie",
                name: "Movie",
                component: () => import("@/views/Movie.vue"),
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
        name: NotFound,
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.afterEach((to, from) => {
    const { query, path, params } = from;

    const prevRoute = {
        path: path,
        query: query,
        params: params,
    };

    localStorage.setItem("prevRoute", JSON.stringify(prevRoute));
});

export default router;
