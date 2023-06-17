import * as VueRouter from "vue-router";

import Home from "@pages/home";
import Clique from "@pages/clique";
import Loading from "@pages/Loading";
import NotFound from "@pages/Not-Found";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: Home,
    },
    {
        path: "/clique",
        name: "clique",
        component: Clique,
    },
    {
        path: "/loading",
        name: "loading",
        component: Loading,
    },
    // insert new routes here
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router;
