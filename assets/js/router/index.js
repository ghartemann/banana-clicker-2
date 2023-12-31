import * as VueRouter from "vue-router";

import Home from "@pages/home";
import Game from "@pages/game";
import Loading from "@pages/Loading";
import NotFound from "@pages/Not-Found";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: Home,
    },
    {
        path: "/game",
        name: "game",
        component: Game,
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
