<template>
  <div class="header-container">
    <div class="logo" @click="toHomePage">
      <div class="logo-img"></div>
      <div class="logo-desc">
        <div class="logo-title">综合交易平台</div>
        <div class="logo-sub-title">凝聚行业核心要素</div>
      </div>
    </div>

    <div class="head-right">
      <div class="tab">
        <router-link to="/shop" v-slot="{ isActive, navigate }" custom>
          <a class="tab-item" :class="{ active: isActive }" @click="navigate">
            集采商城
          </a>
        </router-link>

        <router-link to="/supplier" v-slot="{ isActive, navigate }" custom>
          <a class="tab-item" :class="{ active: isActive }" @click="navigate">
            优选供应商
          </a>
        </router-link>
      </div>

      <div class="right-operate">
        <div class="right-operate-link" @click="supplyRoot">供应商入口</div>

        <div class="right-operate-link" v-if="!isLogin">登录/注册</div>
        <div class="right-operate-user" v-if="isLogin">
          <el-dropdown @command="userOperate" size="large">
            <div class="right-operate-user-innner"></div>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="1">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../store/user";
import { storeToRefs } from "pinia";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const { setUserInfo, setToken } = userStore;
const { isLogin, userInfo } = storeToRefs(userStore);
const userOperate = (command) => {
  let type = Number(command);
  switch (type) {
    case 1:
      // 退出
      logoutOperate();
      break;
    default:
      break;
  }
};

const supplyRoot = () => {
  let url = `https://discipline.zjbdsc.com/bdsupplier/`;
  if (!isLogin.value) {
    url += `login`;
  } else {
    url += `authIsLogin?code=${userInfo.value.code}`;
  }
  window.open(url);
};
const logoutOperate = () => {
  ElMessageBox.confirm("是否确认退出？", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      setToken("");
      setUserInfo({});
    })
    .catch(() => {
      // console.log("cancel");
    });
};

const toHomePage = () => {
  router.push({
    path: "/"
  });
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 1;
}

.logo {
  display: none;
  // display: inline-flex;
  align-items: center;
  height: 100%;
  margin-left: 20px;
  cursor: pointer;

  &-img {
    width: 42px;
    height: 48px;
    background-image: url("../../assets/img/logo.png");
    background-size: 100% 100%;
    margin-right: 10px;
  }

  &-title {
    font-size: 24px;
    color: #1a1a1a;
    line-height: 32px;
    font-weight: bold;
  }

  &-sub-title {
    font-size: 12px;
    color: #666666;
    line-height: 16px;
    letter-spacing: 6px;
  }
}

.tab {
  display: inline-flex;
  align-items: center;
  margin-left: 30px;

  &-item {
    text-decoration: none;
    font-size: 14px;
    color: #1a1a1a;
    cursor: pointer;
    margin-right: 46px;
    font-weight: 400;

    &.active {
      color: #316eff;
      font-weight: 700;
    }
  }
}

.head-right {
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.right-operate {
  display: flex;
  align-items: center;
  height: 100%;
}

.right-operate-link {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #316eff;
  }
}

.right-operate-user {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;

  &-innner {
    width: 42px;
    height: 42px;
    background-image: url("../../assets/img/user_default.png");
    background-size: 100% 100%;
    outline: none;
  }
}

@media screen and (max-width: 1920px) and (min-width: 1450px) {
  .logo {
    display: inline-flex;
  }
}
</style>
