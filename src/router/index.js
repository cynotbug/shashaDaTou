import "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/components/layout/index1.vue";
import NotFound from "@/views/notFound/index.vue";
import Authorize from "../views/authorize/index.vue";

const routes = [
  {
    path: "/authorize",
    component: Authorize
  },
  {
    path: "/login",
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/",
    redirect: "/shasha",
    component: Layout,
    children: [
      {
        path: "shasha",
        name: "shasha",
        redirect: "/shasha/home",
        component: () => import("../views/shasha/index.vue"),
        children: [
          {
            path: "home",
            name: "home",
            component: () => import("../views/shasha/home.vue"),
            meta: {
              title: ""
            }
          }
        ]
      }
    ]
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
  // base: "/ctp/"
  // scrollBehavior(to, from, savedPosition) {
  //   // return 期望滚动到哪个的位置
  //   return {
  //     el: "#main",
  //     top: 0
  //   };
  // }
});
