import { defineStore } from "pinia";
import { ref, computed } from "vue";
import sessionStorage from "../utils/sessionStorage";
import { TOKEN_NAME, USER_INFO } from "../utils/const";

export const useUserStore = defineStore("user", () => {
  let storeToken = sessionStorage.getCache(TOKEN_NAME) || "";
  let info = sessionStorage.getCache(USER_INFO) || {};

  let token = ref(storeToken);

  let userInfo = ref(info);

  const isLogin = computed(() => {
    return !!token.value;
  });

  const setUserInfo = (data) => {
    sessionStorage.setCache(USER_INFO, data);
    userInfo.value = data;
  };

  const setToken = (value) => {
    sessionStorage.setCache(TOKEN_NAME, value);
    token.value = value;
  };

  return {
    token,
    isLogin,
    setToken,
    setUserInfo,
    userInfo
  };
});
