import { useUserStore } from "../store/user";

export const limitDirective = {
  mounted(el, binding) {
    const useStore = useUserStore();
    if (!useStore.isLogin) {
      el.style.display = "none";
    }
  },
  updated(el, binding) {
    const useStore = useUserStore();
    if (!useStore.isLogin) {
      el.style.display = "none";
    }
  }
};
