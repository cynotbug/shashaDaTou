import router from "./index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
NProgress.configure({ showSpinner: false });

const needLoginList = ["/shop/favorites", "/shop/record"];

router.beforeEach((to) => {
  NProgress.start();
  const userStore = useUserStore();
  const { isLogin } = storeToRefs(userStore);

  if (!isLogin.value) {
    const idx = needLoginList.findIndex((item) => {
      return item == to.path;
    });
    if (idx !== -1) {
      // return false;
      return {
        path: "/"
      };
    }
  } else {
    if (to.path == "/authorize") {
      return {
        path: "/"
      };
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
  if (to.path.includes("merchant") && from.path.includes("merchant")) {
    return;
  }
  const dom = document.querySelector("#main");
  dom &&
    dom.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
});
