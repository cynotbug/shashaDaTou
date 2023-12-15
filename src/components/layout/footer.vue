<template>
  <div class="footer-container">
    <div class="footer-content" v-if="!isBanner">
      <div class="bofangicon" @click="handelPlayFn">
        <el-icon><VideoPlay /></el-icon>
      </div>
      <img :src="getFooterbgUrl()" class="img" />
    </div>
    <!-- v-else -->
    <div class="footer-content" @mouseleave="clearVideo" v-else>
      <div class="backicon" @click="handelbackFn">
        <el-icon><DArrowLeft /></el-icon
        ><span style="font-size: 16px; vertical-align: 5px; margin-left: 4px"
          >退出视频</span
        >
      </div>
      <VideoSource
        :videoSource="getbannerVideo()"
        heightValue="230"
        ref="playRef"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VideoSource from "@/views/shasha/components/video.vue";
const isBanner = ref(false);
const playRef = ref(null);
const handelPlayFn = () => {
  isBanner.value = true;
  setTimeout(() => {
    playRef.value && playRef.value.handelPlay();
  });
};
const handelbackFn = () => {
  isBanner.value = false;
};
const clearVideo = () => {
  isBanner.value = false;
};
const getbannerVideo = () => {
  return new URL(`@/assets/img/sthj.mp4`, import.meta.url).href;
};
const getFooterbgUrl = () => {
  return new URL(`@/assets/img/footerimg.jpg`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
// @import "../../assets/css/variable.scss";

.footer-container {
  width: 100%;
  background-color: #000;
}

.footer-content {
  width: 100%;
  height: 230px;
  margin: 0 auto;
  position: relative;
  .img {
    width: 100%;
    height: 100%;
  }
  .bofangicon {
    // width: 100%;
    // height: 230px;
    color: #fff;
    font-size: 65px;
    position: absolute;
    top: 74px;
    right: 763px;
    /* height: 50%; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    cursor: pointer;
  }
  .backicon {
    color: #fff;
    font-size: 20px;
    position: absolute;
    top: 50px;
    left: 10px;
    /* height: 50%; */
    /* transform: translate(-50%, -50%); */
    z-index: 9999;
    cursor: pointer;
  }
}
</style>
