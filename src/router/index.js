import Vue from "vue";
import VueRouter from "vue-router";

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
    const { query, path, params } = from;

    const prevRoute = {
        path: path,
        query: query,
        params: params,
    };

    localStorage.setItem("prevRoute", JSON.stringify(prevRoute));
});

export default router;
