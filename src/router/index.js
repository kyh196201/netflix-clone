import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Browse from "../views/Browse.vue";
import BrowseHome from "../views/BrowseHome.vue";
import Latest from "../views/Latest.vue";
import MyList from "../views/MyList.vue";
import Genre from "../views/Genre.vue";
import SearchResult from "../views/SearchResult.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/search",
        name: "SearchResult",
        component: SearchResult,
    },
    {
        path: "/browse",
        component: Browse,
        children: [
            {
                path: "",
                name: "BrowseHome",
                component: BrowseHome,
            },
            {
                path: "latest",
                name: "Latest",
                component: Latest,
            },
            {
                path: "my-list",
                name: "MyList",
                component: MyList,
            },
            {
                path: "genre/:id",
                name: "Genre",
                component: Genre,
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
