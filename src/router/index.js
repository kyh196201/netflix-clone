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
        component: Home,
    },
    {
        path: "/search",
        name: "Search",
        component: Search,
    },
    {
        path: "/browse",
        component: Browse,
        children: [
            {
                path: "",
                name: "BrowseHome",
                component: BrowseHome,
                children: [
                    {
                        path: "detail/:mid",
                        name: "Detail",
                        component: DetailView,
                        props: true,
                    },
                ],
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
                path: "movie",
                name: "Movie",
                component: Movie,
            },
            {
                path: "person/:pid",
                name: "Person",
                component: Person,
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
