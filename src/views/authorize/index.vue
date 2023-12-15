<template>
  <div></div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { validateIdentity } from "@/api/authorize";
import { useUserStore } from "../../store/user";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

let { setUserInfo, setToken } = userStore;

onMounted(() => {
  const { code } = route.query;

  if (code) {
    validateIdentity({
      code
    }).then((data) => {
      const { tokenInfo } = data;
      data.code = code;
      let token = tokenInfo.tokenValue;
      setToken(token);
      setUserInfo(data);

      router.replace({
        path: "/"
      });
    });
  }
});
</script>

<style lang="scss" scoped></style>
