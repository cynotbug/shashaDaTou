<template>
  <div class="app-container">
    <div class="header">
      <Header></Header>
    </div>

    <div class="main" id="main">
      <div class="content">
        <div class="main-content" ref="mainRef">
          <router-view></router-view>
        </div>

        <div class="footer">
          <Footer></Footer>
        </div>
      </div>
    </div>

    <div class="tool-container">
      <div class="tool-item" v-if="isLogin" @click="toRecord">
        <span class="iconfont icon-zuji tool-item-icon"></span>
        <span class="tool-item-text">足迹</span>
      </div>

      <div class="tool-item phone">
        <span class="iconfont icon-kefu tool-item-icon"></span>
        <span class="tool-item-text">客服</span>

        <div class="tool-item-phone">
          <span
            class="iconfont tool-item-phone-icon icon-24gl-phoneLoudspeaker"
          >
          </span>
          <div class="tool-item-phone-right">
            <div class="tool-item-phone-key">服务热线</div>
            <div class="tool-item-phone-value">400-1234-123</div>
          </div>
        </div>
      </div>
      <div
        class="tool-item scroll"
        @click="scrollToTopOperate"
        v-if="isScrollTopShow"
      >
        <span class="iconfont icon-icon3 tool-item-icon"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Footer from "./footer.vue";
import Header from "./header.vue";
import { useUserStore } from "../../store/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";
import { debounce } from "@/utils/common";

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

const router = useRouter();

const toRecord = () => {
  router.push({
    name: "record"
  });
};

const scrollToTopOperate = () => {
  document.querySelector("#main").scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};

const isScrollTopShow = ref(false);

const watchScroll = (event) => {
  let top = event.target.scrollTop;
  if (top > 280) {
    isScrollTopShow.value = true;
  } else {
    isScrollTopShow.value = false;
  }
};

const debounceFn = debounce(watchScroll);

onMounted(() => {
  document.querySelector("#main").addEventListener("scroll", debounceFn);
});

onUnmounted(() => {
  document.querySelector("#main").removeEventListener("scroll", debounceFn);
});
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";

.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: $min-width;
  overflow: hidden;
}

.header {
  flex-shrink: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
  box-sizing: border-box;
  background-color: #fff;
}

.main {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  @include scrollBar;
  overflow-x: hidden;
}

.content {
  position: relative;
  width: 100%;
  padding-bottom: 346px;
}

.main-content {
  // width: $min-width;
  width: 100%;
  margin: 0 auto;
}

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 346px;
}

.tool-container {
  position: fixed;
  width: 48px;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0px 0px 2px 2px rgba(232, 232, 232, 1);
  z-index: 100;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 62px;
  box-sizing: border-box;
  // padding: 8px 0px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #316eff;
  }

  &.phone {
    position: relative;
  }

  &.scroll {
    height: 44px;
  }

  &-icon {
    font-size: 24px;
    color: #666666;
  }

  &-text {
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }
}

.tool-item:hover {
  .tool-item-icon {
    color: #fff;
  }

  .tool-item-text {
    color: #fff;
  }
}

.tool-item.phone:hover {
  .tool-item-phone {
    transform: translateX(calc(-100% - 8px)) scale(1);
  }
}

.tool-item-phone {
  display: flex;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  width: 172px;
  height: 70px;
  padding: 12px 14px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
  transform: translateX(calc(-100% - 8px)) scale(0);
  transform-origin: right top;
  background-color: #fff;
  box-shadow: 0px 0px 2px 2px rgba(232, 232, 232, 1);

  &-icon {
    font-size: 16px;
    line-height: 20px;
    color: #1a1a1a;
    margin-right: 10px;
  }

  &-key {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 4px;
  }

  &-value {
    font-size: 14px;
    color: #316eff;
  }

  &-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
