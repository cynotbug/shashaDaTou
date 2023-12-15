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
          },
          {
            path: "productList",
            name: "productList",
            component: () => import("../views/shop/productList.vue"),
            meta: {
              title: "产品列表"
            }
          },
          {
            path: "record",
            name: "record",
            component: () => import("../views/shop/record.vue"),
            meta: {
              title: "我的足迹"
            }
          },
          {
            path: "merchant/:id",
            name: "merchant",
            // redirect: "/shop/merchant/enterpriseArchives",
            redirect: (to) => {
              return {
                name: "enterpriseArchives"
              };
            },
            component: () => import("../views/shop/merchant/index.vue"),
            meta: {
              title: ""
            },
            children: [
              {
                path: "enterpriseArchives",
                name: "enterpriseArchives",
                component: () => import("../views/shop/enterpriseArchives.vue"),
                meta: {
                  title: "企业档案"
                }
              },
              {
                path: "product",
                name: "product",
                // redirect: "/shop/merchant/:id/product/list",
                redirect: () => {
                  return {
                    name: "merchantProductList"
                  };
                },
                children: [
                  {
                    path: "list/:first?/:second?",
                    name: "merchantProductList",
                    component: () =>
                      import("../views/shop/merchant/productList.vue"),
                    meta: {
                      title: "产品列表"
                    }
                  },
                  {
                    path: "detail/:productId",
                    name: "productDetail",
                    component: () =>
                      import("../views/shop/merchant/productDetail.vue"),
                    meta: {
                      title: "产品详情"
                    }
                  }
                ]
              },
              {
                path: "contactUs",
                name: "contactUs",
                component: () => import("../views/shop/contactUs.vue"),
                meta: {
                  title: "联系我们"
                }
              }
            ]
          },
          {
            path: "favorites",
            name: "favorites",
            component: () => import("../views/shop/Favorites/index.vue"),
            meta: {
              title: "收藏夹"
            }
          }
          // {
          //   path: "enterpriseArchives",
          //   name: "enterpriseArchives",
          //   component: () => import("../views/shop/enterpriseArchives.vue"),
          //   meta: {
          //     title: "企业档案"
          //   }
          // },
          // {
          //   path: "contactUs",
          //   name: "contactUs",
          //   component: () => import("../views/shop/contactUs.vue"),
          //   meta: {
          //     title: "联系我们"
          //   }
          // }
        ]
      },
      {
        path: "supplier",
        name: "supplier",
        component: () => import("../views/supplier/index.vue")
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
